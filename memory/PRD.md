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
- ✅ Syntax highlighting for Python code blocks: dependency-free tokenizer in `src/components/CodeBlock.tsx` (keywords, builtins, strings, comments, numbers, decorators) with light/dark palettes; used in lesson screen. Verified via screenshots in both themes.
- ✅ Rebranded off the Emergent app-builder platform: new bundle ID (`com.rahulprakash.pylessonhub`), icons/splash art, "Learn Python" app name, EAS Update wired up for OTA JS updates, progress export/import (JSON via native share sheet, validated on import).
- ✅ Achievements/badges: 14 badges across lesson-count, module-completion, quiz-performance and streak milestones (`src/data/achievements.ts`). Unlock evaluation runs inside `progressStore` on every `markLessonComplete`/`setQuizScore`, is idempotent (badges never re-fire), and persists as `unlockedBadges` (id → ISO unlock date) alongside the rest of progress, including export/import. A global `BadgeUnlockToast` in `_layout.tsx` shows a banner + haptic the instant a badge unlocks, regardless of which screen triggered it. Progress tab has a "badges earned" stat card and an ACHIEVEMENTS grid (locked = greyed lock icon, unlocked = colored icon); tapping any badge opens a detail modal with description and unlock date. Verified via Playwright screenshots (light + dark) and a live unlock flow (mark first lesson complete → "First Step" toast fires).

- ✅ Bookmarks/favourites: `bookmarkedLessonIds` (a `Set<string>` in the live store, serialised to an array only at the persistence/export boundary) with a `toggleBookmark(lessonId)` action. Star icon (MaterialCommunityIcons, filled + `colors.brandSecondary` gold when saved) in the lesson-detail header, top-right next to the back button. Courses tab has a "SAVED LESSONS (X/130)" section above the module list — lists bookmarks in module order via `getBookmarkedLessons()` in `src/data/course.ts`, with an empty state when there are none. Included in progress export/import (validated in `sanitizeProgressSnapshot`, unknown lesson IDs dropped). Verified via Playwright: toggle on lesson screen, appears in Courses' saved section, survives a full page reload (proves the Set↔array round-trip that export/import also relies on).

- ✅ Per-lesson notes: `lessonNotes` (lessonId → private on-device text) in `progressStore`, `setLessonNote(lessonId, note)` action — empty/whitespace notes are dropped rather than stored. "My notes" collapsible card in the lesson screen (matches the Quick Quiz card pattern) with a multiline `TextInput`; edits are debounced 500ms before committing to the store (and flushed immediately on blur or on leaving the lesson) so typing doesn't hammer AsyncStorage with a full-blob write per keystroke. Included in export/import (capped at 4000 chars/note on import). Verified via Playwright: typed a note, collapsed/reopened, confirmed the next lesson's notes are independent and empty, navigated back and confirmed the note was still there, and confirmed it survives a full page reload with the exact text intact.

- ✅ Daily goal reminders: `expo-notifications` (added as a dependency, `~0.32.17`, plugin registered in `app.json`). `dailyReminderEnabled`/`dailyReminderHour`/`dailyReminderMinute` in `progressStore`, persisted and included in export/import, but deliberately excluded from `clearAllProgress` (a device preference, not progress data — same treatment as `darkMode`). `src/utils/reminders.ts` wraps the native module: `remindersSupported()` gates everything on `Platform.OS !== "web"`; `syncDailyReminder()` is called from a direct user gesture (the Settings toggle/time chip) and may prompt for permission; `silentlyResyncDailyReminder()` runs once on app launch (after store hydration) and never prompts — it only re-arms the OS-level schedule if permission is already granted, keeping it fresh after things like a reinstall. Settings has a REMINDERS section: toggle + subtitle showing the active time, and (when enabled) four time-of-day preset chips (Morning/Afternoon/Evening/Night). Denied permission flips the toggle back off with an explanatory toast rather than leaving it in a broken-enabled state. Verified in the web preview (the only environment testable here): UI renders correctly, and toggling on gracefully shows "Reminders aren't available in this preview" without crashing — actual notification firing needs a real device/emulator build to verify, which wasn't available in this environment.

## Backlog / Future
None currently — all items from the original backlog have shipped. Future ideas would need to come from user feedback.
