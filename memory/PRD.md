# Learn Python — Product Requirements Document

## Original Problem Statement
Build a simple, fully-offline mobile app to learn Python: 13 modules, 130+ lessons,
readable lesson content, MCQ quizzes with explanations and scoring, local progress
tracking, dark mode toggle, and a learning streak. No backend, no cloud, no auth.

## User Choices
- Content depth: Full 13 modules with 130+ real lessons
- Visual style: Clean & modern (Python blue #3776AB / yellow #FFD43B accents)
- Navigation: Standard bottom tabs (Courses / Progress / Settings)
- Theme: Light by default with a working dark-mode toggle
- Extra: Learning streak

## Architecture
- Frontend: React Native Expo (SDK 54), expo-router (file-based routing)
- State: Zustand store with manual on-device persistence via `@/src/utils/storage`
  (storage key: `learn-python-progress`). NOTE: zustand `persist` middleware is NOT
  used because its ESM build uses `import.meta`, which Metro's web bundler cannot parse.
- Data: Curriculum embedded in-app under `src/data/modules/m00..m12.ts`, assembled in
  `src/data/course.ts`. 13 modules × 10 lessons = 130 lessons.
- No backend / no database / no network calls.

## Key Screens & Routes
- `app/index.tsx` → redirects to `/(tabs)/courses`
- `app/(tabs)/courses.tsx` — course header (overall %), 13 module cards
- `app/(tabs)/progress.tsx` — overall %, streak, per-module breakdown, quiz scores, Continue
- `app/(tabs)/settings.tsx` — dark mode toggle, clear data (confirm modal), about
- `app/module/[moduleId].tsx` — lessons list for a module
- `app/lesson/[lessonId].tsx` — content, key points, code snippet, Mark Complete, expandable quiz
- Components: `ProgressBar`, `ModuleCard`, `QuizEngine`

## Implemented (2026-06)
- ✅ Full 13-module / 130-lesson Python curriculum with content, key points, code, quizzes
- ✅ Courses tab with overall progress hero + module cards + per-module progress
- ✅ Module detail with lesson completion state
- ✅ Lesson detail: content, key points, code block, Mark Complete, expandable one-at-a-time MCQ quiz with explanations + score
- ✅ Progress tab: streak (current + best), overall %, per-module breakdown, quiz scores, Continue/resume
- ✅ Settings: dark mode toggle (store-driven, whole app), clear data with confirm modal, about
- ✅ Local persistence across reloads; streak increments on lesson completion
- ✅ E2E tested (frontend); quiz-result race condition fixed (set local UI state before store update; memoized lesson lookup)
- ✅ Lesson Search: inline search bar on Courses tab (`searchLessons()` in `src/data/course.ts` — ranked title/key-topic/module matching); live results replace module list, tap jumps to lesson, clear restores modules, empty state. E2E tested (iteration_2, all pass). Streaks re-verified working.

## Backlog / Future
- P1: Bookmark/favourite lessons
- P1: Syntax highlighting for code blocks
- P2: Daily goal reminders; per-lesson notes
- P2: Achievements/badges beyond streaks
