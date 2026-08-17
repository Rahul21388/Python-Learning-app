import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { QuizEngine } from "@/src/components/QuizEngine";
import { findLesson } from "@/src/data/course";
import { useProgressStore } from "@/src/store/progressStore";
import { CODE_FONT } from "@/src/theme/useTheme";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";
import { useMemo, useState } from "react";

export default function LessonDetailScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

  const info = useMemo(() => findLesson(lessonId), [lessonId]);
  const completed = useProgressStore((s) => s.lessonsCompleted);
  const markLessonComplete = useProgressStore((s) => s.markLessonComplete);
  const setLastLesson = useProgressStore((s) => s.setLastLesson);

  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    if (lessonId) setLastLesson(lessonId);
  }, [lessonId, setLastLesson]);

  if (!info) {
    return (
      <View
        style={[
          styles.root,
          { backgroundColor: colors.surface, justifyContent: "center" },
        ]}
      >
        <Text style={{ color: colors.muted, textAlign: "center" }}>
          Lesson content missing.
        </Text>
      </View>
    );
  }

  const { module, lesson, nextLessonId } = info;
  const isDone = completed.includes(lesson.lessonId);

  const onMarkComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    markLessonComplete(lesson.lessonId);
  };

  const onNext = () => {
    if (nextLessonId) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.replace({
        pathname: "/lesson/[lessonId]",
        params: { lessonId: nextLessonId },
      });
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <ScrollView
        testID="lesson-scroll"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.lg,
          paddingBottom: 120,
        }}
      >
        <Pressable
          testID="lesson-back-button"
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={22} color={colors.brand} />
          <Text
            numberOfLines={1}
            style={[styles.backText, { color: colors.brand }]}
          >
            {module.title}
          </Text>
        </Pressable>

        <View style={styles.metaRow}>
          <View style={[styles.timePill, { backgroundColor: colors.brandTertiary }]}>
            <Ionicons name="time-outline" size={14} color={colors.brand} />
            <Text style={[styles.timeText, { color: colors.brand }]}>
              {lesson.time}
            </Text>
          </View>
          {isDone && (
            <View style={[styles.timePill, { backgroundColor: colors.success }]}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              <Text style={[styles.timeText, { color: "#FFFFFF" }]}>
                Completed
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.h1, { color: colors.onSurface }]}>
          {lesson.title}
        </Text>

        <Text style={[styles.body, { color: colors.onSurfaceSecondary }]}>
          {lesson.content}
        </Text>

        {lesson.code ? (
          <View
            style={[styles.codeBlock, { backgroundColor: colors.surfaceSecondary }]}
          >
            <View style={styles.codeHeader}>
              <Ionicons name="logo-python" size={14} color={colors.brand} />
              <Text style={[styles.codeLabel, { color: colors.muted }]}>
                Python
              </Text>
            </View>
            <Text
              style={[styles.codeText, { color: colors.onSurface }]}
              selectable
            >
              {lesson.code}
            </Text>
          </View>
        ) : null}

        {lesson.keys.length > 0 && (
          <View
            style={[styles.keysBox, { backgroundColor: colors.brandTertiary }]}
          >
            <Text style={[styles.keysTitle, { color: colors.brand }]}>
              Key points
            </Text>
            {lesson.keys.map((k, i) => (
              <View key={i} style={styles.keyRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={colors.brand}
                />
                <Text style={[styles.keyText, { color: colors.onSurface }]}>
                  {k}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Quiz expandable */}
        {lesson.quiz.length > 0 && (
          <View
            style={[
              styles.quizCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Pressable
              testID="quiz-toggle"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setQuizOpen((o) => !o);
              }}
              style={styles.quizHeader}
            >
              <View style={styles.quizHeaderLeft}>
                <View
                  style={[
                    styles.quizIcon,
                    { backgroundColor: colors.brandSecondary },
                  ]}
                >
                  <Ionicons
                    name="help"
                    size={18}
                    color={colors.onBrandSecondary}
                  />
                </View>
                <View>
                  <Text style={[styles.quizTitle, { color: colors.onSurface }]}>
                    Quick quiz
                  </Text>
                  <Text style={[styles.quizSub, { color: colors.muted }]}>
                    {lesson.quiz.length} questions
                  </Text>
                </View>
              </View>
              <Ionicons
                name={quizOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color={colors.muted}
              />
            </Pressable>
            {quizOpen && (
              <View style={styles.quizContent}>
                <QuizEngine
                  questions={lesson.quiz}
                  lessonId={lesson.lessonId}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Sticky CTA */}
      <View
        style={[
          styles.ctaWrap,
          {
            paddingBottom: insets.bottom + spacing.sm,
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ]}
      >
        {!isDone ? (
          <Pressable
            testID="mark-complete-button"
            onPress={onMarkComplete}
            style={[styles.cta, { backgroundColor: colors.brand }]}
          >
            <Ionicons name="checkmark-circle" size={20} color={colors.onBrand} />
            <Text style={[styles.ctaText, { color: colors.onBrand }]}>
              Mark complete
            </Text>
          </Pressable>
        ) : (
          <Pressable
            testID="next-lesson-button"
            onPress={onNext}
            style={[styles.cta, { backgroundColor: colors.brand }]}
          >
            <Text style={[styles.ctaText, { color: colors.onBrand }]}>
              {nextLessonId ? "Next lesson" : "Back to module"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color={colors.onBrand} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    marginLeft: -4,
  },
  backText: { fontSize: 16, fontWeight: "500", flexShrink: 1 },
  metaRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.sm },
  timePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  timeText: { fontSize: 12, fontWeight: "700" },
  h1: { fontSize: 26, fontWeight: "800", marginBottom: spacing.md },
  body: { fontSize: 16, lineHeight: 25 },
  codeBlock: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  codeHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  codeLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  codeText: { fontFamily: CODE_FONT, fontSize: 13.5, lineHeight: 21 },
  keysBox: {
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  keysTitle: { fontSize: 14, fontWeight: "800", marginBottom: 2 },
  keyRow: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
  keyText: { fontSize: 15, lineHeight: 21, flex: 1 },
  quizCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.xl,
    overflow: "hidden",
  },
  quizHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  quizHeaderLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  quizIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  quizTitle: { fontSize: 16, fontWeight: "700" },
  quizSub: { fontSize: 13 },
  quizContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  ctaWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radius.md,
    paddingVertical: 15,
  },
  ctaText: { fontSize: 16, fontWeight: "700" },
});
