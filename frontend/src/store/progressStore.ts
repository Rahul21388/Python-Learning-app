import { create } from "zustand";
import { BADGES, buildAchievementContext, evaluateBadges } from "@/src/data/achievements";
import { ALL_LESSONS } from "@/src/data/course";
import { storage } from "@/src/utils/storage";

const STORAGE_KEY = "learn-python-progress";

function dayKey(d: Date): string {
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return local.toISOString().slice(0, 10);
}

interface ProgressState {
  lessonsCompleted: string[];
  quizScores: Record<string, number>; // key = lessonId, value = 0-100
  lastLessonId: string;
  darkMode: boolean;
  streak: number;
  bestStreak: number;
  lastActiveDate: string;
  unlockedBadges: Record<string, string>; // badge id -> ISO date unlocked
  newlyUnlocked: string[]; // pending badge ids to show as a toast, most recent last
  _hasHydrated: boolean;

  markLessonComplete: (lessonId: string) => void;
  setQuizScore: (lessonId: string, score: number) => void;
  setLastLesson: (lessonId: string) => void;
  toggleDarkMode: () => void;
  clearAllProgress: () => void;
  dismissBadge: (badgeId: string) => void;
  setHasHydrated: (v: boolean) => void;
}

// Diffs current progress against already-unlocked badges and returns the
// state patch for any newly-earned ones. Returns {} when nothing changed,
// so callers can spread the result without clobbering unrelated fields.
function withBadgeUnlocks(
  state: ProgressState,
  next: {
    lessonsCompleted?: string[];
    quizScores?: Record<string, number>;
    bestStreak?: number;
  },
): Partial<ProgressState> {
  const completed = next.lessonsCompleted ?? state.lessonsCompleted;
  const quizScores = next.quizScores ?? state.quizScores;
  const bestStreak = next.bestStreak ?? state.bestStreak;
  const ctx = buildAchievementContext(completed, quizScores, bestStreak);
  const earnedIds = evaluateBadges(ctx);

  const unlockedBadges = { ...state.unlockedBadges };
  const newlyEarned: string[] = [];
  const now = new Date().toISOString();
  for (const id of earnedIds) {
    if (!unlockedBadges[id]) {
      unlockedBadges[id] = now;
      newlyEarned.push(id);
    }
  }
  if (newlyEarned.length === 0) return {};
  return {
    unlockedBadges,
    newlyUnlocked: [...state.newlyUnlocked, ...newlyEarned],
  };
}

function computeStreak(state: ProgressState): {
  streak: number;
  bestStreak: number;
  lastActiveDate: string;
} {
  const today = new Date();
  const todayKey = dayKey(today);
  if (state.lastActiveDate === todayKey) {
    const s = state.streak || 1;
    return {
      streak: s,
      bestStreak: Math.max(state.bestStreak, s),
      lastActiveDate: todayKey,
    };
  }
  let streak = 1;
  if (state.lastActiveDate) {
    const diff = Math.round(
      (new Date(todayKey).getTime() -
        new Date(state.lastActiveDate).getTime()) /
        86400000,
    );
    streak = diff === 1 ? state.streak + 1 : 1;
  }
  return {
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    lastActiveDate: todayKey,
  };
}

export const useProgressStore = create<ProgressState>((set) => ({
  lessonsCompleted: [],
  quizScores: {},
  lastLessonId: "",
  darkMode: false,
  streak: 0,
  bestStreak: 0,
  lastActiveDate: "",
  unlockedBadges: {},
  newlyUnlocked: [],
  _hasHydrated: false,

  markLessonComplete: (lessonId) =>
    set((state) => {
      const completed = state.lessonsCompleted.includes(lessonId)
        ? state.lessonsCompleted
        : [...state.lessonsCompleted, lessonId];
      const streakInfo = computeStreak(state);
      const next = {
        lessonsCompleted: completed,
        lastLessonId: lessonId,
        ...streakInfo,
      };
      return { ...next, ...withBadgeUnlocks(state, next) };
    }),

  setQuizScore: (lessonId, score) =>
    set((state) => {
      const next = { quizScores: { ...state.quizScores, [lessonId]: score } };
      return { ...next, ...withBadgeUnlocks(state, next) };
    }),

  setLastLesson: (lessonId) => set({ lastLessonId: lessonId }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  clearAllProgress: () =>
    set({
      lessonsCompleted: [],
      quizScores: {},
      lastLessonId: "",
      streak: 0,
      bestStreak: 0,
      lastActiveDate: "",
      unlockedBadges: {},
      newlyUnlocked: [],
    }),

  dismissBadge: (badgeId) =>
    set((state) => ({
      newlyUnlocked: state.newlyUnlocked.filter((id) => id !== badgeId),
    })),

  setHasHydrated: (v) => set({ _hasHydrated: v }),
}));

// --- Manual persistence (avoids zustand/middleware which breaks web bundling) ---
export type ProgressSnapshot = Pick<
  ProgressState,
  | "lessonsCompleted"
  | "quizScores"
  | "lastLessonId"
  | "darkMode"
  | "streak"
  | "bestStreak"
  | "lastActiveDate"
  | "unlockedBadges"
>;

function extract(state: ProgressState): ProgressSnapshot {
  return {
    lessonsCompleted: state.lessonsCompleted,
    quizScores: state.quizScores,
    lastLessonId: state.lastLessonId,
    darkMode: state.darkMode,
    streak: state.streak,
    bestStreak: state.bestStreak,
    lastActiveDate: state.lastActiveDate,
    unlockedBadges: state.unlockedBadges,
  };
}

// Hydrate once on load, then persist on every change.
void (async () => {
  const raw = await storage.getItem<string>(STORAGE_KEY, "");
  if (raw) {
    try {
      const data = JSON.parse(raw) as Partial<ProgressSnapshot>;
      useProgressStore.setState(data);
    } catch {
      // corrupt data — start fresh
    }
  }
  useProgressStore.getState().setHasHydrated(true);
})();

useProgressStore.subscribe((state) => {
  if (!state._hasHydrated) return;
  void storage.setItem(STORAGE_KEY, JSON.stringify(extract(state)));
});

// --- Export / import (Settings > Data) ---

export function getProgressSnapshot(): ProgressSnapshot {
  return extract(useProgressStore.getState());
}

// Untrusted input (a user-provided file) — every field is checked before use, and
// lesson references are dropped if they don't match a lesson that exists in this
// build, so an edited or stale export can't inject bogus IDs into the store.
export function sanitizeProgressSnapshot(raw: unknown): ProgressSnapshot | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const hasRecognizedShape =
    Array.isArray(obj.lessonsCompleted) ||
    (typeof obj.quizScores === "object" && obj.quizScores !== null) ||
    typeof obj.streak === "number" ||
    typeof obj.lastLessonId === "string";
  if (!hasRecognizedShape) return null;

  const validLessonIds = new Set(ALL_LESSONS.map((l) => l.lessonId));

  const lessonsCompleted = Array.isArray(obj.lessonsCompleted)
    ? obj.lessonsCompleted.filter(
        (id): id is string => typeof id === "string" && validLessonIds.has(id),
      )
    : [];

  const quizScores: Record<string, number> = {};
  if (obj.quizScores && typeof obj.quizScores === "object") {
    for (const [lessonId, score] of Object.entries(
      obj.quizScores as Record<string, unknown>,
    )) {
      if (
        validLessonIds.has(lessonId) &&
        typeof score === "number" &&
        Number.isFinite(score)
      ) {
        quizScores[lessonId] = Math.max(0, Math.min(100, Math.round(score)));
      }
    }
  }

  const lastLessonId =
    typeof obj.lastLessonId === "string" && validLessonIds.has(obj.lastLessonId)
      ? obj.lastLessonId
      : "";
  const streak =
    typeof obj.streak === "number" && Number.isFinite(obj.streak)
      ? Math.max(0, Math.round(obj.streak))
      : 0;
  const bestStreak =
    typeof obj.bestStreak === "number" && Number.isFinite(obj.bestStreak)
      ? Math.max(streak, Math.round(obj.bestStreak))
      : streak;
  const lastActiveDate = typeof obj.lastActiveDate === "string" ? obj.lastActiveDate : "";
  const darkMode = typeof obj.darkMode === "boolean" ? obj.darkMode : false;

  const validBadgeIds = new Set(BADGES.map((b) => b.id));
  const unlockedBadges: Record<string, string> = {};
  if (obj.unlockedBadges && typeof obj.unlockedBadges === "object") {
    for (const [id, date] of Object.entries(
      obj.unlockedBadges as Record<string, unknown>,
    )) {
      if (validBadgeIds.has(id) && typeof date === "string") {
        unlockedBadges[id] = date;
      }
    }
  }

  return {
    lessonsCompleted,
    quizScores,
    lastLessonId,
    darkMode,
    streak,
    bestStreak,
    lastActiveDate,
    unlockedBadges,
  };
}

export function applyProgressSnapshot(snapshot: ProgressSnapshot): void {
  useProgressStore.setState(snapshot);
}
