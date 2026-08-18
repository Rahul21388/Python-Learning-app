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
  bookmarkedLessonIds: Set<string>;
  lessonNotes: Record<string, string>; // lessonId -> private on-device note
  dailyReminderEnabled: boolean;
  dailyReminderHour: number; // 0-23, local time
  dailyReminderMinute: number; // 0-59
  _hasHydrated: boolean;

  markLessonComplete: (lessonId: string) => void;
  setQuizScore: (lessonId: string, score: number) => void;
  setLastLesson: (lessonId: string) => void;
  toggleDarkMode: () => void;
  clearAllProgress: () => void;
  dismissBadge: (badgeId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  setLessonNote: (lessonId: string, note: string) => void;
  setDailyReminderEnabled: (enabled: boolean) => void;
  setDailyReminderTime: (hour: number, minute: number) => void;
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
  bookmarkedLessonIds: new Set(),
  lessonNotes: {},
  dailyReminderEnabled: false,
  dailyReminderHour: 19,
  dailyReminderMinute: 0,
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
      bookmarkedLessonIds: new Set(),
      lessonNotes: {},
    }),

  dismissBadge: (badgeId) =>
    set((state) => ({
      newlyUnlocked: state.newlyUnlocked.filter((id) => id !== badgeId),
    })),

  toggleBookmark: (lessonId) =>
    set((state) => {
      const next = new Set(state.bookmarkedLessonIds);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return { bookmarkedLessonIds: next };
    }),

  // Empty/whitespace-only notes are dropped rather than stored, so an
  // emptied note doesn't linger in export/import or count as "has a note".
  setLessonNote: (lessonId, note) =>
    set((state) => {
      const lessonNotes = { ...state.lessonNotes };
      if (note.trim()) {
        lessonNotes[lessonId] = note;
      } else {
        delete lessonNotes[lessonId];
      }
      return { lessonNotes };
    }),

  setDailyReminderEnabled: (enabled) => set({ dailyReminderEnabled: enabled }),

  setDailyReminderTime: (hour, minute) =>
    set({ dailyReminderHour: hour, dailyReminderMinute: minute }),

  setHasHydrated: (v) => set({ _hasHydrated: v }),
}));

// --- Manual persistence (avoids zustand/middleware which breaks web bundling) ---
// A separate (not Pick<ProgressState, ...>) shape because bookmarkedLessonIds is a
// Set in the live store but Sets aren't JSON-serialisable — it's an array here.
export interface ProgressSnapshot {
  lessonsCompleted: string[];
  quizScores: Record<string, number>;
  lastLessonId: string;
  darkMode: boolean;
  streak: number;
  bestStreak: number;
  lastActiveDate: string;
  unlockedBadges: Record<string, string>;
  bookmarkedLessonIds: string[];
  lessonNotes: Record<string, string>;
  dailyReminderEnabled: boolean;
  dailyReminderHour: number;
  dailyReminderMinute: number;
}

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
    bookmarkedLessonIds: Array.from(state.bookmarkedLessonIds),
    lessonNotes: state.lessonNotes,
    dailyReminderEnabled: state.dailyReminderEnabled,
    dailyReminderHour: state.dailyReminderHour,
    dailyReminderMinute: state.dailyReminderMinute,
  };
}

// Converts a persisted snapshot (bookmarkedLessonIds as an array) back into a
// store patch (bookmarkedLessonIds as a Set).
function toStatePatch(snapshot: Partial<ProgressSnapshot>): Partial<ProgressState> {
  const { bookmarkedLessonIds, ...rest } = snapshot;
  return {
    ...rest,
    ...(bookmarkedLessonIds ? { bookmarkedLessonIds: new Set(bookmarkedLessonIds) } : {}),
  };
}

// Hydrate once on load, then persist on every change.
void (async () => {
  const raw = await storage.getItem<string>(STORAGE_KEY, "");
  if (raw) {
    try {
      const data = JSON.parse(raw) as Partial<ProgressSnapshot>;
      useProgressStore.setState(toStatePatch(data));
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
    typeof obj.lastLessonId === "string" ||
    Array.isArray(obj.bookmarkedLessonIds) ||
    (typeof obj.lessonNotes === "object" && obj.lessonNotes !== null);
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

  const bookmarkedLessonIds = Array.isArray(obj.bookmarkedLessonIds)
    ? Array.from(
        new Set(
          obj.bookmarkedLessonIds.filter(
            (id): id is string => typeof id === "string" && validLessonIds.has(id),
          ),
        ),
      )
    : [];

  const lessonNotes: Record<string, string> = {};
  if (obj.lessonNotes && typeof obj.lessonNotes === "object") {
    for (const [lessonId, note] of Object.entries(
      obj.lessonNotes as Record<string, unknown>,
    )) {
      if (validLessonIds.has(lessonId) && typeof note === "string" && note.trim()) {
        lessonNotes[lessonId] = note.slice(0, 4000);
      }
    }
  }

  const dailyReminderEnabled =
    typeof obj.dailyReminderEnabled === "boolean" ? obj.dailyReminderEnabled : false;
  const dailyReminderHour =
    typeof obj.dailyReminderHour === "number" &&
    Number.isInteger(obj.dailyReminderHour) &&
    obj.dailyReminderHour >= 0 &&
    obj.dailyReminderHour <= 23
      ? obj.dailyReminderHour
      : 19;
  const dailyReminderMinute =
    typeof obj.dailyReminderMinute === "number" &&
    Number.isInteger(obj.dailyReminderMinute) &&
    obj.dailyReminderMinute >= 0 &&
    obj.dailyReminderMinute <= 59
      ? obj.dailyReminderMinute
      : 0;

  return {
    lessonsCompleted,
    quizScores,
    lastLessonId,
    darkMode,
    streak,
    bestStreak,
    lastActiveDate,
    unlockedBadges,
    bookmarkedLessonIds,
    lessonNotes,
    dailyReminderEnabled,
    dailyReminderHour,
    dailyReminderMinute,
  };
}

export function applyProgressSnapshot(snapshot: ProgressSnapshot): void {
  useProgressStore.setState(toStatePatch(snapshot));
}
