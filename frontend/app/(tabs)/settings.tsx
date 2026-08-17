import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
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

import { useProgressStore } from "@/src/store/progressStore";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";

export default function SettingsScreen() {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const darkMode = useProgressStore((s) => s.darkMode);
  const toggleDarkMode = useProgressStore((s) => s.toggleDarkMode);
  const clearAllProgress = useProgressStore((s) => s.clearAllProgress);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [cleared, setCleared] = useState(false);

  const onToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleDarkMode();
  };

  const onClear = () => {
    clearAllProgress();
    setConfirmVisible(false);
    setCleared(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setCleared(false), 2000);
  };

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
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View
                style={[styles.rowIcon, { backgroundColor: colors.brandTertiary }]}
              >
                <Ionicons name="moon" size={18} color={colors.brand} />
              </View>
              <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
                Dark mode
              </Text>
            </View>
            <Switch
              testID="dark-mode-switch"
              value={darkMode}
              onValueChange={onToggle}
              trackColor={{ false: colors.surfaceTertiary, true: colors.brand }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={[styles.section, { color: colors.muted }]}>DATA</Text>
        <View
          style={[styles.group, { backgroundColor: colors.surfaceSecondary }]}
        >
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
        {cleared && (
          <Text
            testID="cleared-toast"
            style={[styles.clearedNote, { color: colors.success }]}
          >
            ✓ All progress cleared
          </Text>
        )}

        <Text style={[styles.section, { color: colors.muted }]}>ABOUT</Text>
        <View
          style={[styles.group, { backgroundColor: colors.surfaceSecondary }]}
        >
          <View style={[styles.row, styles.rowBorder, { borderColor: colors.divider }]}>
            <Text style={[styles.rowLabel, { color: colors.onSurface }]}>
              Version
            </Text>
            <Text style={[styles.rowValue, { color: colors.muted }]}>1.0.0</Text>
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
      {/* keep dark var referenced to avoid unused warnings */}
      {dark ? null : null}
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
  rowValue: { fontSize: 15 },
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
