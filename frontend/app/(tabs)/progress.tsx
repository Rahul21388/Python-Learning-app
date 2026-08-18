import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProgressBar } from "@/src/components/ProgressBar";
import { Badge, BADGES } from "@/src/data/achievements";
import {
  COURSE_DATA,
  findLesson,
  getFirstLessonId,
  getModuleProgress,
  getOverallProgress,
} from "@/src/data/course";
import { useProgressStore } from "@/src/store/progressStore";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";

export default function ProgressScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const completed = useProgressStore((s) => s.lessonsCompleted);
  const quizScores = useProgressStore((s) => s.quizScores);
  const streak = useProgressStore((s) => s.streak);
  const bestStreak = useProgressStore((s) => s.bestStreak);
  const lastLessonId = useProgressStore((s) => s.lastLessonId);
  const unlockedBadges = useProgressStore((s) => s.unlockedBadges);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const overall = getOverallProgress(completed);
  const quizEntries = Object.entries(quizScores);
  const avgQuiz =
    quizEntries.length > 0
      ? Math.round(
          quizEntries.reduce((a, [, v]) => a + v, 0) / quizEntries.length,
        )
      : 0;

  const resumeId = lastLessonId || getFirstLessonId();
  const resumeInfo = findLesson(resumeId);
  const badgeCount = Object.keys(unlockedBadges).length;

  const onContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/lesson/[lessonId]",
      params: { lessonId: resumeId },
    });
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <ScrollView
        testID="progress-scroll"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.lg,
          paddingBottom: 120,
        }}
      >
        <Text style={[styles.h1, { color: colors.onSurface }]}>Progress</Text>

        {/* Bento grid: streak + overall */}
        <View style={styles.grid}>
          <View
            style={[
              styles.streakCard,
              { backgroundColor: colors.brandSecondary },
            ]}
          >
            <Ionicons name="flame" size={28} color="#E8622C" />
            <Text style={[styles.streakNum, { color: colors.onBrandSecondary }]}>
              {streak}
            </Text>
            <Text style={[styles.streakLabel, { color: colors.onBrandSecondary }]}>
              day streak
            </Text>
            <Text style={[styles.streakBest, { color: colors.onBrandSecondary }]}>
              Best: {bestStreak}
            </Text>
          </View>

          <View
            style={[
              styles.overallCard,
              { backgroundColor: colors.surfaceSecondary },
            ]}
          >
            <Text style={[styles.cardLabel, { color: colors.muted }]}>
              Course complete
            </Text>
            <Text style={[styles.overallPct, { color: colors.brand }]}>
              {Math.round(overall.pct * 100)}%
            </Text>
            <ProgressBar progress={overall.pct} height={8} />
            <Text style={[styles.cardSub, { color: colors.muted }]}>
              {overall.done}/{overall.total} lessons
            </Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View
            style={[styles.statCard, { backgroundColor: colors.surfaceSecondary }]}
          >
            <Ionicons name="help-circle" size={22} color={colors.brand} />
            <Text style={[styles.statNum, { color: colors.onSurface }]}>
              {quizEntries.length}
            </Text>
            <Text style={[styles.cardSub, { color: colors.muted }]}>
              quizzes taken
            </Text>
          </View>
          <View
            style={[styles.statCard, { backgroundColor: colors.surfaceSecondary }]}
          >
            <Ionicons name="ribbon" size={22} color={colors.success} />
            <Text style={[styles.statNum, { color: colors.onSurface }]}>
              {avgQuiz}%
            </Text>
            <Text style={[styles.cardSub, { color: colors.muted }]}>
              avg quiz score
            </Text>
          </View>
          <View
            style={[styles.statCard, { backgroundColor: colors.surfaceSecondary }]}
          >
            <Ionicons name="medal" size={22} color={colors.brandSecondary} />
            <Text style={[styles.statNum, { color: colors.onSurface }]}>
              {badgeCount}/{BADGES.length}
            </Text>
            <Text style={[styles.cardSub, { color: colors.muted }]}>
              badges earned
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <Text style={[styles.section, { color: colors.muted }]}>
          ACHIEVEMENTS
        </Text>
        <View style={styles.badgeGrid}>
          {BADGES.map((b) => {
            const isUnlocked = !!unlockedBadges[b.id];
            return (
              <Pressable
                key={b.id}
                testID={`badge-${b.id}`}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedBadge(b);
                }}
                style={styles.badgeCell}
              >
                <View
                  style={[
                    styles.badgeIcon,
                    {
                      backgroundColor: isUnlocked
                        ? colors.brandSecondary
                        : colors.surfaceSecondary,
                    },
                  ]}
                >
                  <Ionicons
                    name={isUnlocked ? (b.icon as any) : "lock-closed"}
                    size={22}
                    color={isUnlocked ? colors.onBrandSecondary : colors.muted}
                  />
                </View>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.badgeLabel,
                    { color: isUnlocked ? colors.onSurface : colors.muted },
                  ]}
                >
                  {b.title}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Module breakdown */}
        <Text style={[styles.section, { color: colors.muted }]}>
          MODULE BREAKDOWN
        </Text>
        <View style={{ gap: spacing.md }}>
          {COURSE_DATA.modules.map((m, i) => {
            const { done, total, pct } = getModuleProgress(m, completed);
            return (
              <View
                key={m.id}
                testID={`progress-module-${m.id}`}
                style={[
                  styles.moduleRow,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              >
                <View style={styles.moduleRowTop}>
                  <Text
                    numberOfLines={1}
                    style={[styles.moduleTitle, { color: colors.onSurface }]}
                  >
                    {String(i).padStart(2, "0")}. {m.title}
                  </Text>
                  <Text style={[styles.moduleCount, { color: colors.muted }]}>
                    {done}/{total}
                  </Text>
                </View>
                <ProgressBar progress={pct} height={6} />
              </View>
            );
          })}
        </View>

        {/* Quiz scores */}
        {quizEntries.length > 0 && (
          <>
            <Text style={[styles.section, { color: colors.muted }]}>
              QUIZ SCORES
            </Text>
            <View style={{ gap: spacing.sm }}>
              {quizEntries.map(([lessonId, score]) => {
                const info = findLesson(lessonId);
                return (
                  <View
                    key={lessonId}
                    style={[
                      styles.quizRow,
                      { backgroundColor: colors.surfaceSecondary },
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      style={[styles.quizTitle, { color: colors.onSurface }]}
                    >
                      {info?.lesson.title ?? lessonId}
                    </Text>
                    <View
                      style={[
                        styles.scorePill,
                        {
                          backgroundColor:
                            score >= 60 ? colors.success : colors.warning,
                        },
                      ]}
                    >
                      <Text style={styles.scorePillText}>{score}%</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      {/* Sticky continue */}
      <View
        style={[
          styles.continueWrap,
          {
            paddingBottom: insets.bottom + spacing.sm,
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ]}
      >
        <Pressable
          testID="continue-button"
          onPress={onContinue}
          style={[styles.continueBtn, { backgroundColor: colors.brand }]}
        >
          <Ionicons name="play" size={18} color={colors.onBrand} />
          <Text style={[styles.continueText, { color: colors.onBrand }]}>
            {lastLessonId ? "Continue learning" : "Start learning"}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.continueSub, { color: colors.onBrand }]}
          >
            {resumeInfo?.lesson.title ?? ""}
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={!!selectedBadge}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedBadge(null)}
        >
          {selectedBadge && (
            <View
              testID="badge-detail-modal"
              style={[styles.modalCard, { backgroundColor: colors.surface }]}
            >
              <View
                style={[
                  styles.modalIcon,
                  {
                    backgroundColor: unlockedBadges[selectedBadge.id]
                      ? colors.brandSecondary
                      : colors.surfaceSecondary,
                  },
                ]}
              >
                <Ionicons
                  name={
                    unlockedBadges[selectedBadge.id]
                      ? (selectedBadge.icon as any)
                      : "lock-closed"
                  }
                  size={28}
                  color={
                    unlockedBadges[selectedBadge.id]
                      ? colors.onBrandSecondary
                      : colors.muted
                  }
                />
              </View>
              <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
                {selectedBadge.title}
              </Text>
              <Text style={[styles.modalText, { color: colors.muted }]}>
                {selectedBadge.description}
              </Text>
              <Text style={[styles.modalSub, { color: colors.muted }]}>
                {unlockedBadges[selectedBadge.id]
                  ? `Unlocked ${new Date(
                      unlockedBadges[selectedBadge.id],
                    ).toLocaleDateString()}`
                  : "Locked"}
              </Text>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  h1: { fontSize: 30, fontWeight: "800", marginBottom: spacing.lg },
  grid: { flexDirection: "row", gap: spacing.md },
  streakCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 2,
  },
  streakNum: { fontSize: 40, fontWeight: "800", marginTop: 4 },
  streakLabel: { fontSize: 14, fontWeight: "700" },
  streakBest: { fontSize: 12, marginTop: 6, opacity: 0.7 },
  overallCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    justifyContent: "center",
    gap: spacing.sm,
  },
  cardLabel: { fontSize: 12, fontWeight: "600" },
  overallPct: { fontSize: 34, fontWeight: "800" },
  cardSub: { fontSize: 12 },
  statsRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.md },
  statCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: 4,
  },
  statNum: { fontSize: 24, fontWeight: "800", marginTop: 4 },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  badgeCell: {
    width: "22%",
    alignItems: "center",
    gap: 6,
  },
  badgeIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: { fontSize: 11, fontWeight: "600", textAlign: "center" },
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
  modalSub: { fontSize: 13, fontWeight: "600", marginTop: spacing.xs },
  section: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  moduleRow: { borderRadius: radius.md, padding: spacing.md, gap: spacing.sm },
  moduleRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moduleTitle: { fontSize: 14, fontWeight: "600", flex: 1, paddingRight: 8 },
  moduleCount: { fontSize: 13, fontWeight: "600" },
  quizRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.md,
    padding: spacing.md,
  },
  quizTitle: { fontSize: 14, flex: 1, paddingRight: 8 },
  scorePill: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  scorePillText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  continueWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  continueText: { fontSize: 16, fontWeight: "700" },
  continueSub: { fontSize: 13, opacity: 0.85, flex: 1, textAlign: "right" },
});
