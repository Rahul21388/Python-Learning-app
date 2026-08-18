import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  applyProgressSnapshot,
  getProgressSnapshot,
  ProgressSnapshot,
  sanitizeProgressSnapshot,
  useProgressStore,
} from "@/src/store/progressStore";
import {
  radius,
  spacing,
  TEXT_SIZE_LABELS,
  TEXT_SIZE_SCALES,
  THEME_PREFERENCES,
  ThemePreference,
} from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";
import { remindersSupported, syncDailyReminder } from "@/src/utils/reminders";

const THEME_OPTION_LABELS: Record<ThemePreference, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const REMINDER_TIME_PRESETS: { label: string; hour: number; minute: number }[] = [
  { label: "9:00 AM", hour: 9, minute: 0 },
  { label: "1:00 PM", hour: 13, minute: 0 },
  { label: "6:00 PM", hour: 18, minute: 0 },
  { label: "9:00 PM", hour: 21, minute: 0 },
];

function formatReminderTime(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

export default function SettingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const themePreference = useProgressStore((s) => s.themePreference);
  const setThemePreference = useProgressStore((s) => s.setThemePreference);
  const textSizeScale = useProgressStore((s) => s.textSizeScale);
  const setTextSizeScale = useProgressStore((s) => s.setTextSizeScale);
  const clearAllProgress = useProgressStore((s) => s.clearAllProgress);
  const dailyReminderEnabled = useProgressStore((s) => s.dailyReminderEnabled);
  const dailyReminderHour = useProgressStore((s) => s.dailyReminderHour);
  const dailyReminderMinute = useProgressStore((s) => s.dailyReminderMinute);
  const setDailyReminderEnabled = useProgressStore((s) => s.setDailyReminderEnabled);
  const setDailyReminderTime = useProgressStore((s) => s.setDailyReminderTime);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pendingImport, setPendingImport] = useState<ProgressSnapshot | null>(
    null,
  );
  const [toast, setToast] = useState<{
    text: string;
    tone: "success" | "error";
  } | null>(null);

  const showToast = (text: string, tone: "success" | "error" = "success") => {
    setToast({ text, tone });
    Haptics.notificationAsync(
      tone === "success"
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    );
    setTimeout(() => setToast(null), 2500);
  };

  const onSelectTheme = (pref: ThemePreference) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setThemePreference(pref);
  };

  const onSelectTextSize = (scale: (typeof TEXT_SIZE_SCALES)[number]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTextSizeScale(scale);
  };

  const onToggleReminder = async (next: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!remindersSupported()) {
      showToast("Reminders aren't available in this preview", "error");
      return;
    }
    const result = await syncDailyReminder(
      next,
      dailyReminderHour,
      dailyReminderMinute,
    );
    if (result === "permission-denied") {
      setDailyReminderEnabled(false);
      showToast("Notifications permission denied — enable it in system settings", "error");
      return;
    }
    setDailyReminderEnabled(next);
    showToast(next ? "Daily reminder set" : "Daily reminder turned off");
  };

  const onSelectReminderTime = async (hour: number, minute: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDailyReminderTime(hour, minute);
    if (!dailyReminderEnabled) return;
    const result = await syncDailyReminder(true, hour, minute);
    if (result === "permission-denied") {
      setDailyReminderEnabled(false);
      showToast("Notifications permission denied — enable it in system settings", "error");
    }
  };

  const onClear = () => {
    clearAllProgress();
    setConfirmVisible(false);
    showToast("All progress cleared");
  };

  const onExport = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const payload = {
        app: "learn-python",
        exportVersion: 1,
        exportedAt: new Date().toISOString(),
        data: getProgressSnapshot(),
      };
      const file = new File(Paths.cache, `learn-python-progress-${Date.now()}.json`);
      file.create({ overwrite: true });
      file.write(JSON.stringify(payload, null, 2));

      if (!(await Sharing.isAvailableAsync())) {
        showToast("Sharing isn't available on this device", "error");
        return;
      }
      await Sharing.shareAsync(file.uri, {
        mimeType: "application/json",
        dialogTitle: "Export your progress",
        UTI: "public.json",
      });
    } catch {
      showToast("Couldn't export progress", "error");
    }
  };

  const onImportPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;

      const file = new File(result.assets[0].uri);
      const parsed = JSON.parse(await file.text());
      const raw =
        parsed && typeof parsed === "object" && "data" in parsed
          ? (parsed as { data: unknown }).data
          : parsed;
      const snapshot = sanitizeProgressSnapshot(raw);
      if (!snapshot) {
        showToast("That file isn't a valid progress export", "error");
        return;
      }
      setPendingImport(snapshot);
    } catch {
      showToast("Couldn't read that file", "error");
    }
  };

  const onConfirmImport = () => {
    if (!pendingImport) return;
    applyProgressSnapshot(pendingImport);
    setPendingImport(null);
    showToast("Progress imported");
  };

  const openLink = async (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Linking.openURL(url);
    } catch {
      // No app available to handle the URL (e.g. no mail client) — nothing to recover, just skip.
    }
  };

  const onMoreApps = () =>
    openLink("https://play.google.com/store/apps/dev?id=8034666750185557028");

  const onSendFeedback = () => openLink("mailto:admin@rahulprakash.co.in");

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + spacing.xxxl,
        }}
      >
        <Text style={[styles.h1, { color: colors.onSurface }]}>Settings</Text>

        <Text style={[styles.section, { color: colors.muted }]}>
          APPEARANCE
        </Text>
        <View
          style={[styles.group, { backgroundColor: colors.surfaceSecondary }]}
        >
          <View style={[styles.row, styles.rowBorder, { borderColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="moon" size={18} color={colors.brand} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                Theme
              </Text>
            </View>
          </View>
          <View style={styles.reminderTimeRow}>
            {THEME_PREFERENCES.map((pref) => {
              const selected = pref === themePreference;
              return (
                <Pressable
                  key={pref}
                  testID={`theme-option-${pref}`}
                  onPress={() => onSelectTheme(pref)}
                  style={[
                    styles.timeChip,
                    {
                      backgroundColor: selected
                        ? colors.brand
                        : colors.surfaceTertiary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      { color: selected ? colors.onBrand : colors.onSurface },
                    ]}
                  >
                    {THEME_OPTION_LABELS[pref]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.row, styles.rowBorder, { borderColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="text" size={18} color={colors.brand} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                Lesson text size
              </Text>
            </View>
          </View>
          <View style={styles.reminderTimeRow}>
            {TEXT_SIZE_SCALES.map((scale) => {
              const selected = scale === textSizeScale;
              return (
                <Pressable
                  key={scale}
                  testID={`text-size-${scale}`}
                  onPress={() => onSelectTextSize(scale)}
                  style={[
                    styles.timeChip,
                    {
                      backgroundColor: selected
                        ? colors.brand
                        : colors.surfaceTertiary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      { color: selected ? colors.onBrand : colors.onSurface },
                    ]}
                  >
                    {TEXT_SIZE_LABELS[scale]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={[styles.section, { color: colors.muted }]}>
          REMINDERS
        </Text>
        <View
          style={[styles.group, { backgroundColor: colors.surfaceSecondary }]}
        >
          <View
            style={[
              styles.row,
              dailyReminderEnabled && styles.rowBorder,
              { borderColor: colors.divider },
            ]}
          >
            <View style={[styles.rowLeft, { flex: 1, marginRight: spacing.sm }]}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="notifications" size={18} color={colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                  Daily reminder
                </Text>
                <Text style={[styles.rowSub, { color: colors.muted }]}>
                  {dailyReminderEnabled
                    ? `Reminds you at ${formatReminderTime(
                        dailyReminderHour,
                        dailyReminderMinute,
                      )} every day`
                    : "A gentle nudge to keep your streak going"}
                </Text>
              </View>
            </View>
            <Switch
              testID="daily-reminder-switch"
              value={dailyReminderEnabled}
              onValueChange={onToggleReminder}
              trackColor={{ false: colors.surfaceTertiary, true: colors.brand }}
              thumbColor="#FFFFFF"
            />
          </View>
          {dailyReminderEnabled && (
            <View style={styles.reminderTimeRow}>
              {REMINDER_TIME_PRESETS.map((preset) => {
                const selected =
                  preset.hour === dailyReminderHour &&
                  preset.minute === dailyReminderMinute;
                return (
                  <Pressable
                    key={preset.label}
                    testID={`reminder-time-${preset.hour}-${preset.minute}`}
                    onPress={() => onSelectReminderTime(preset.hour, preset.minute)}
                    style={[
                      styles.timeChip,
                      {
                        backgroundColor: selected
                          ? colors.brand
                          : colors.surfaceTertiary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeChipText,
                        { color: selected ? colors.onBrand : colors.onSurface },
                      ]}
                    >
                      {preset.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        <Text style={[styles.section, { color: colors.muted }]}>DATA</Text>
        <View
          style={[styles.group, { backgroundColor: colors.surfaceSecondary }]}
        >
          <Pressable
            testID="export-progress-button"
            style={[styles.row, styles.rowBorder, { borderColor: colors.divider }]}
            onPress={onExport}
          >
            <View style={styles.rowLeft}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="share-outline" size={18} color={colors.brand} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                Export progress
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
          <Pressable
            testID="import-progress-button"
            style={[styles.row, styles.rowBorder, { borderColor: colors.divider }]}
            onPress={onImportPress}
          >
            <View style={styles.rowLeft}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="download-outline" size={18} color={colors.brand} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                Import progress
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
          <Pressable
            testID="clear-data-button"
            style={styles.row}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setConfirmVisible(true);
            }}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.rowIcon, { backgroundColor: "#FDE7E7" }]}>
                <Ionicons name="trash" size={18} color={colors.error} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.error }]}>
                Clear local data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        </View>
        {toast && (
          <Text
            testID="settings-toast"
            style={[
              styles.clearedNote,
              { color: toast.tone === "success" ? colors.success : colors.error },
            ]}
          >
            {toast.tone === "success" ? "✓" : "✕"} {toast.text}
          </Text>
        )}

        <Text style={[styles.section, { color: colors.muted }]}>MORE</Text>
        <View
          style={[styles.group, { backgroundColor: colors.surfaceSecondary }]}
        >
          <Pressable
            testID="more-apps-button"
            style={[styles.row, styles.rowBorder, { borderColor: colors.divider }]}
            onPress={onMoreApps}
          >
            <View style={styles.rowLeft}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="apps" size={18} color={colors.brand} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                More apps by Rahul
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
          <Pressable
            testID="send-feedback-button"
            style={styles.row}
            onPress={onSendFeedback}
          >
            <View style={styles.rowLeft}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="mail" size={18} color={colors.brand} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                Send feedback
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        </View>

        <Text style={[styles.section, { color: colors.muted }]}>ABOUT</Text>
        <View
          style={[styles.group, { backgroundColor: colors.surfaceSecondary }]}
        >
          <View style={[styles.row, styles.rowBorder, { borderColor: colors.divider }]}>
            <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
              Version
            </Text>
            <Text style={[styles.rowValue, { color: colors.muted }]}>
              {Constants.expoConfig?.version ?? "1.0.1"}
            </Text>
          </View>
          <View style={styles.aboutBody}>
            <View style={styles.aboutHeader}>
              <Ionicons name="logo-python" size={26} color={colors.brand} />
              <Text style={[styles.aboutTitle, { color: colors.onSurface }]}>
                Learn Python
              </Text>
            </View>
            <Text style={[styles.aboutText, { color: colors.muted }]}>
              A simple, offline-first way to learn Python — 13 modules and 130+
              lessons with interactive quizzes. All your progress is stored
              privately on this device.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            testID="clear-confirm-modal"
            style={[styles.modalCard, { backgroundColor: colors.surface }]}
          >
            <View style={[styles.modalIcon, { backgroundColor: "#FDE7E7" }]}>
              <Ionicons name="warning" size={26} color={colors.error} />
            </View>
            <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
              Clear all data?
            </Text>
            <Text style={[styles.modalText, { color: colors.muted }]}>
              This will reset your completed lessons, quiz scores and streak.
              This can&apos;t be undone.
            </Text>
            <View style={styles.modalBtns}>
              <Pressable
                testID="clear-cancel-button"
                onPress={() => setConfirmVisible(false)}
                style={[
                  styles.modalBtn,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              >
                <Text style={[styles.modalBtnText, { color: colors.onSurface }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                testID="clear-confirm-button"
                onPress={onClear}
                style={[styles.modalBtn, { backgroundColor: colors.error }]}
              >
                <Text style={[styles.modalBtnText, { color: colors.onError }]}>
                  Clear
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!pendingImport}
        transparent
        animationType="fade"
        onRequestClose={() => setPendingImport(null)}
      >
        <View style={styles.modalOverlay}>
          <View
            testID="import-confirm-modal"
            style={[styles.modalCard, { backgroundColor: colors.surface }]}
          >
            <View style={[styles.modalIcon, { backgroundColor: "#FDE7E7" }]}>
              <Ionicons name="warning" size={26} color={colors.error} />
            </View>
            <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
              Import progress?
            </Text>
            <Text style={[styles.modalText, { color: colors.muted }]}>
              This will replace your current completed lessons, quiz scores
              and streak with the data from this file. This can&apos;t be
              undone.
            </Text>
            <View style={styles.modalBtns}>
              <Pressable
                testID="import-cancel-button"
                onPress={() => setPendingImport(null)}
                style={[
                  styles.modalBtn,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              >
                <Text style={[styles.modalBtnText, { color: colors.onSurface }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                testID="import-confirm-button"
                onPress={onConfirmImport}
                style={[styles.modalBtn, { backgroundColor: colors.error }]}
              >
                <Text style={[styles.modalBtnText, { color: colors.onError }]}>
                  Replace
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  h1: { fontSize: 30, fontWeight: "800", marginBottom: spacing.lg },
  section: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  group: { borderRadius: radius.md, overflow: "hidden" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    minHeight: 56,
  },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { fontSize: 16, fontWeight: "500" },
  rowSub: { fontSize: 12, marginTop: 2 },
  rowValue: { fontSize: 15 },
  reminderTimeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    padding: spacing.md,
  },
  timeChip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  timeChipText: { fontSize: 13, fontWeight: "700" },
  clearedNote: { fontSize: 14, fontWeight: "600", marginTop: spacing.sm },
  aboutBody: { padding: spacing.md, gap: spacing.sm },
  aboutHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  aboutTitle: { fontSize: 18, fontWeight: "700" },
  aboutText: { fontSize: 14, lineHeight: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  modalCard: {
    width: "100%",
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.sm,
  },
  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  modalTitle: { fontSize: 20, fontWeight: "800" },
  modalText: { fontSize: 14, lineHeight: 20, textAlign: "center" },
  modalBtns: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
    width: "100%",
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: "center",
  },
  modalBtnText: { fontSize: 16, fontWeight: "700" },
});
