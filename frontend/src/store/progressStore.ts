import { create } from "zustand";
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
  _hasHydrated: boolean;

  markLessonComplete: (lessonId: string) => void;
  setQuizScore: (lessonId: string, score: number) => void;
  setLastLesson: (lessonId: string) => void;
  toggleDarkMode: () => void;
  clearAllProgress: () => void;
  setHasHydrated: (v: boolean) => void;
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
  _hasHydrated: false,

  markLessonComplete: (lessonId) =>
    set((state) => {
      const completed = state.lessonsCompleted.includes(lessonId)
        ? state.lessonsCompleted
        : [...state.lessonsCompleted, lessonId];
      const streakInfo = computeStreak(state);
      return {
        lessonsCompleted: completed,
        lastLessonId: lessonId,
        ...streakInfo,
      };
    }),

  setQuizScore: (lessonId, score) =>
    set((state) => ({
      quizScores: { ...state.quizScores, [lessonId]: score },
    })),

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
    }),

  setHasHydrated: (v) => set({ _hasHydrated: v }),
}));

// --- Manual persistence (avoids zustand/middleware which breaks web bundling) ---
type Persisted = Pick<
  ProgressState,
  | "lessonsCompleted"
  | "quizScores"
  | "lastLessonId"
  | "darkMode"
  | "streak"
  | "bestStreak"
  | "lastActiveDate"
>;

function extract(state: ProgressState): Persisted {
  return {
    lessonsCompleted: state.lessonsCompleted,
    quizScores: state.quizScores,
    lastLessonId: state.lastLessonId,
    darkMode: state.darkMode,
    streak: state.streak,
    bestStreak: state.bestStreak,
    lastActiveDate: state.lastActiveDate,
  };
}

// Hydrate once on load, then persist on every change.
void (async () => {
  const raw = await storage.getItem<string>(STORAGE_KEY, "");
  if (raw) {
    try {
      const data = JSON.parse(raw) as Partial<Persisted>;
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
