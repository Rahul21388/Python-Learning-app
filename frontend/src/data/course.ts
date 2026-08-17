import { CourseData, Lesson, Module } from "./types";
import { m00 } from "./modules/m00";
import { m01 } from "./modules/m01";
import { m02 } from "./modules/m02";
import { m03 } from "./modules/m03";
import { m04 } from "./modules/m04";
import { m05 } from "./modules/m05";
import { m06 } from "./modules/m06";
import { m07 } from "./modules/m07";
import { m08 } from "./modules/m08";
import { m09 } from "./modules/m09";
import { m10 } from "./modules/m10";
import { m11 } from "./modules/m11";
import { m12 } from "./modules/m12";

export const COURSE_DATA: CourseData = {
  course: {
    title: "Learn Python",
    description:
      "Go from zero to confident Python developer with 13 hands-on modules.",
  },
  modules: [m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12],
};

export const ALL_LESSONS: Lesson[] = COURSE_DATA.modules.flatMap(
  (m) => m.lessons,
);

export const TOTAL_LESSONS = ALL_LESSONS.length;

export function getModuleProgress(
  module: Module,
  completed: string[],
): { done: number; total: number; pct: number } {
  const set = new Set(completed);
  const done = module.lessons.filter((l) => set.has(l.lessonId)).length;
  const total = module.lessons.length;
  return { done, total, pct: total > 0 ? done / total : 0 };
}

export function getOverallProgress(completed: string[]): {
  done: number;
  total: number;
  pct: number;
} {
  const validIds = new Set(ALL_LESSONS.map((l) => l.lessonId));
  const done = completed.filter((id) => validIds.has(id)).length;
  const total = TOTAL_LESSONS;
  return { done, total, pct: total > 0 ? done / total : 0 };
}

export function findLesson(lessonId: string): {
  module: Module;
  lesson: Lesson;
  nextLessonId: string | null;
} | null {
  for (let mi = 0; mi < COURSE_DATA.modules.length; mi++) {
    const module = COURSE_DATA.modules[mi];
    const li = module.lessons.findIndex((l) => l.lessonId === lessonId);
    if (li !== -1) {
      let nextLessonId: string | null = null;
      if (li + 1 < module.lessons.length) {
        nextLessonId = module.lessons[li + 1].lessonId;
      } else if (mi + 1 < COURSE_DATA.modules.length) {
        nextLessonId = COURSE_DATA.modules[mi + 1].lessons[0]?.lessonId ?? null;
      }
      return { module, lesson: module.lessons[li], nextLessonId };
    }
  }
  return null;
}

export function getModule(moduleId: string): Module | undefined {
  return COURSE_DATA.modules.find((m) => m.id === moduleId);
}

export function getFirstLessonId(): string {
  return COURSE_DATA.modules[0].lessons[0].lessonId;
}
