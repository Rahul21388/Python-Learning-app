import { COURSE_DATA, getModuleProgress, TOTAL_LESSONS } from "./course";

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Ionicons name
}

export const BADGES: Badge[] = [
  { id: "first_lesson", title: "First Step", description: "Complete your first lesson", icon: "footsteps" },
  { id: "ten_lessons", title: "Getting Momentum", description: "Complete 10 lessons", icon: "trending-up" },
  { id: "fifty_lessons", title: "Halfway Warrior", description: "Complete 50 lessons", icon: "flash" },
  { id: "all_lessons", title: "Python Graduate", description: "Complete all 130 lessons", icon: "school" },
  { id: "first_module", title: "Module Finisher", description: "Complete your first module", icon: "checkmark-done-circle" },
  { id: "half_modules", title: "Halfway There", description: "Complete half of all modules", icon: "podium" },
  { id: "all_modules", title: "Course Champion", description: "Complete every module", icon: "trophy" },
  { id: "first_quiz", title: "Quiz Taker", description: "Complete your first quiz", icon: "help-circle" },
  { id: "quiz_regular", title: "Quiz Regular", description: "Complete 10 quizzes", icon: "library" },
  { id: "perfect_quiz", title: "Perfectionist", description: "Score 100% on a quiz", icon: "star" },
  { id: "perfect_five", title: "Ace Streak", description: "Score 100% on 5 quizzes", icon: "sparkles" },
  { id: "streak_3", title: "Warming Up", description: "Reach a 3-day streak", icon: "flame" },
  { id: "streak_7", title: "One Week Strong", description: "Reach a 7-day streak", icon: "flame" },
  { id: "streak_30", title: "Unstoppable", description: "Reach a 30-day streak", icon: "flame" },
];

export interface AchievementContext {
  completedCount: number;
  totalLessons: number;
  modulesCompleted: number;
  totalModules: number;
  quizCount: number;
  perfectQuizCount: number;
  bestStreak: number;
}

export function buildAchievementContext(
  completed: string[],
  quizScores: Record<string, number>,
  bestStreak: number,
): AchievementContext {
  const modulesCompleted = COURSE_DATA.modules.filter(
    (m) => getModuleProgress(m, completed).done === m.lessons.length,
  ).length;
  const quizValues = Object.values(quizScores);
  return {
    completedCount: completed.length,
    totalLessons: TOTAL_LESSONS,
    modulesCompleted,
    totalModules: COURSE_DATA.modules.length,
    quizCount: quizValues.length,
    perfectQuizCount: quizValues.filter((s) => s >= 100).length,
    bestStreak,
  };
}

// Returns the ids of every badge whose unlock condition currently holds.
// Badges are cumulative/permanent, so callers only need to diff this
// against what's already unlocked to find newly-earned ones.
export function evaluateBadges(ctx: AchievementContext): string[] {
  const earned: string[] = [];
  if (ctx.completedCount >= 1) earned.push("first_lesson");
  if (ctx.completedCount >= 10) earned.push("ten_lessons");
  if (ctx.completedCount >= 50) earned.push("fifty_lessons");
  if (ctx.completedCount >= ctx.totalLessons) earned.push("all_lessons");
  if (ctx.modulesCompleted >= 1) earned.push("first_module");
  if (ctx.modulesCompleted >= Math.ceil(ctx.totalModules / 2)) earned.push("half_modules");
  if (ctx.modulesCompleted >= ctx.totalModules) earned.push("all_modules");
  if (ctx.quizCount >= 1) earned.push("first_quiz");
  if (ctx.quizCount >= 10) earned.push("quiz_regular");
  if (ctx.perfectQuizCount >= 1) earned.push("perfect_quiz");
  if (ctx.perfectQuizCount >= 5) earned.push("perfect_five");
  if (ctx.bestStreak >= 3) earned.push("streak_3");
  if (ctx.bestStreak >= 7) earned.push("streak_7");
  if (ctx.bestStreak >= 30) earned.push("streak_30");
  return earned;
}
