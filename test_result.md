#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================
frontend:
  - task: "Lesson Search on Courses tab"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/(tabs)/courses.tsx, /app/frontend/src/data/course.ts"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Added inline search bar to Courses tab. searchLessons() in course.ts ranks by title-startsWith > title-includes > key-topics > module title. Results replace module list while typing; tap navigates to /lesson/[lessonId]; clear button restores modules. Smoke-tested via screenshot: 'loop' returns 14 results."

  - task: "Streaks feature (store + Progress tab UI)"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/store/progressStore.ts, /app/frontend/app/(tabs)/progress.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Streak logic already exists (computeStreak on markLessonComplete, streak/bestStreak persisted). Needs verification that completing a lesson sets streak to 1 and Progress tab flame card updates."

  - task: "Achievements / badges system"
    implemented: true
    working: true
    file: "/app/frontend/src/data/achievements.ts, /app/frontend/src/store/progressStore.ts, /app/frontend/src/components/BadgeUnlockToast.tsx, /app/frontend/app/(tabs)/progress.tsx, /app/frontend/app/_layout.tsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Added 14 badges (lesson-count, module-completion, quiz-performance, streak milestones). Unlock logic lives in progressStore, evaluated on markLessonComplete/setQuizScore, idempotent, persisted as unlockedBadges (id->ISO date) and included in export/import + sanitizeProgressSnapshot. Global BadgeUnlockToast in _layout.tsx shows a banner+haptic on unlock from any screen. Progress tab: 'badges earned' stat card + ACHIEVEMENTS grid (testIDs: badge-<id>), tap opens badge-detail-modal with description/unlock date. Verified with Playwright against `expo start --web`: initial locked-grid screenshot, badge-detail modal, live unlock toast after marking first lesson complete ('First Step'), and dark-mode contrast check — all passed, no console errors."

  - task: "Bookmarks / favourite lessons"
    implemented: true
    working: true
    file: "/app/frontend/src/store/progressStore.ts, /app/frontend/src/data/course.ts, /app/frontend/app/lesson/[lessonId].tsx, /app/frontend/app/(tabs)/courses.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "bookmarkedLessonIds is a Set<string> in the live store (toggleBookmark action, idempotent), serialised to string[] only at the persistence/export boundary via toStatePatch()/extract(). Star icon (MaterialCommunityIcons star/star-outline, testID lesson-bookmark-button) in lesson header top-right, filled+colors.brandSecondary when saved. Courses tab shows a SAVED LESSONS (X/130) section (testIDs saved-lesson-<id>, saved-lessons-empty-state) above the module list, ordered by getBookmarkedLessons() in course.ts. Included in sanitizeProgressSnapshot for export/import, unknown lesson ids dropped. Verified via Playwright: toggle on lesson screen -> appears in Courses saved section -> survives a full page reload (same Set<->array round trip export/import uses)."

  - task: "Per-lesson notes"
    implemented: true
    working: true
    file: "/app/frontend/src/store/progressStore.ts, /app/frontend/app/lesson/[lessonId].tsx"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "lessonNotes: Record<lessonId, string> in progressStore, setLessonNote() drops empty/whitespace notes. 'My notes' collapsible card in lesson screen (testIDs: notes-toggle, lesson-notes-input) mirrors the Quick Quiz card. Edits debounced 500ms before hitting the store (flushed on blur / on leaving the lesson via a useEffect cleanup keyed on lessonId) to avoid a full-blob AsyncStorage write per keystroke. Included in sanitizeProgressSnapshot for export/import (4000 char cap per note). Verified via Playwright: typed + saved a note, collapsed/reopened, confirmed next lesson has an independent empty note, navigated back and confirmed persistence, and confirmed the exact text survives a full page reload."

  - task: "Daily goal reminders"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/utils/reminders.ts, /app/frontend/src/store/progressStore.ts, /app/frontend/app/(tabs)/settings.tsx, /app/frontend/app/_layout.tsx, /app/frontend/app.json"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Added expo-notifications (~0.32.17) + plugin entry in app.json. progressStore: dailyReminderEnabled/Hour/Minute, persisted + in export/import, deliberately NOT reset by clearAllProgress (device preference, like darkMode). src/utils/reminders.ts: remindersSupported() (false on web), syncDailyReminder() (user-gesture path, may prompt for permission, called from Settings toggle/time chips), silentlyResyncDailyReminder() (launch-time re-arm, never prompts, only acts if permission already granted). Settings REMINDERS section: toggle with live subtitle + 4 time-preset chips (Morning/Afternoon/Evening/Night); permission-denied flips the toggle back off with a toast instead of leaving it stuck on. Ran into a Metro stale-cache 500 after adding the native module — fixed with `expo start -c`. Verified in web preview only: UI renders, toggle-on gracefully shows the 'not available in this preview' toast, zero console errors. NOT verified: actual notification permission prompt or delivery on a real device/emulator — none was available in this environment. needs_retesting left true until that device-level check happens."

agent_communication:
  - agent: "main"
    message: "Iteration 2: verify new Lesson Search (search bar on Courses tab, testIDs: lesson-search-input, search-result-<id>, search-clear-button, search-empty-state) and confirm existing streaks feature updates after completing a lesson. Offline app, no backend."
  - agent: "main"
    message: "Iteration 3: added Achievements/badges (see task above). Self-verified via Playwright screenshots (light+dark, unlock toast, detail modal). No testing agent run yet — flagging for review if you want a broader pass (e.g. module-completion and streak badges weren't exercised live, only lesson/quiz-count ones)."
  - agent: "main"
    message: "Iteration 4: added Bookmarks/favourites (see task above). Self-verified via Playwright: bookmark toggle, Saved Lessons list, persistence across reload. Not yet exercised: the actual Settings export-file -> edit JSON -> import round trip (only the underlying sanitize/serialise functions were exercised indirectly via reload)."
  - agent: "main"
    message: "Iteration 5: added per-lesson notes (see task above). Self-verified via Playwright. Backlog is now down to one item: daily goal reminders."
  - agent: "main"
    message: "Iteration 6: added Daily goal reminders (see task above). This is the last original backlog item -- all planned features have now shipped. Flagging for a real-device test pass before this ships: local-notification permission prompts and actual delivery can't be exercised in the web preview this environment is limited to."
