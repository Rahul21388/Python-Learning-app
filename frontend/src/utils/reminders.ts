import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const REMINDER_ID = "daily-python-reminder";
const CHANNEL_ID = "daily-reminder";

export type ReminderSyncResult =
  | "scheduled"
  | "cancelled"
  | "permission-denied"
  | "unsupported";

// Local scheduled notifications aren't available in the Expo web build.
export function remindersSupported(): boolean {
  return Platform.OS !== "web";
}

let handlerInstalled = false;
function ensureHandler() {
  if (handlerInstalled || !remindersSupported()) return;
  handlerInstalled = true;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

async function scheduleAt(hour: number, minute: number): Promise<void> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Daily reminder",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER_ID,
    content: {
      title: "🐍 Keep your streak going!",
      body: "You've got a few Python lessons waiting for you today.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: CHANNEL_ID,
    },
  });
}

// Called from a direct user gesture (the Settings toggle/time picker) —
// may prompt the OS permission dialog.
export async function syncDailyReminder(
  enabled: boolean,
  hour: number,
  minute: number,
): Promise<ReminderSyncResult> {
  if (!remindersSupported()) return "unsupported";
  ensureHandler();
  await Notifications.cancelScheduledNotificationAsync(REMINDER_ID).catch(() => {});
  if (!enabled) return "cancelled";

  let status = await Notifications.getPermissionsAsync();
  if (!status.granted) {
    status = await Notifications.requestPermissionsAsync();
  }
  if (!status.granted) return "permission-denied";

  await scheduleAt(hour, minute);
  return "scheduled";
}

// Called on app launch to keep the OS-level schedule in sync with persisted
// settings (e.g. after a reinstall) — never prompts for permission itself,
// so it can safely run unattended on every cold start.
export async function silentlyResyncDailyReminder(
  enabled: boolean,
  hour: number,
  minute: number,
): Promise<ReminderSyncResult> {
  if (!remindersSupported()) return "unsupported";
  ensureHandler();
  await Notifications.cancelScheduledNotificationAsync(REMINDER_ID).catch(() => {});
  if (!enabled) return "cancelled";

  const status = await Notifications.getPermissionsAsync();
  if (!status.granted) return "permission-denied";

  await scheduleAt(hour, minute);
  return "scheduled";
}
