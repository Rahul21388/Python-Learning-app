import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ModuleCard } from "@/src/components/ModuleCard";
import { ProgressBar } from "@/src/components/ProgressBar";
import {
  COURSE_DATA,
  LessonSearchResult,
  TOTAL_LESSONS,
  getBookmarkedLessons,
  getModuleProgress,
  getOverallProgress,
  searchLessons,
} from "@/src/data/course";
import { Module } from "@/src/data/types";
import { useProgressStore } from "@/src/store/progressStore";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";

export default function CoursesScreen() {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const completed = useProgressStore((s) => s.lessonsCompleted);
  const bookmarkedLessonIds = useProgressStore((s) => s.bookmarkedLessonIds);
  const overall = getOverallProgress(completed);

  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;
  const results = useMemo(() => searchLessons(query), [query]);
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const bookmarkedLessons = useMemo(
    () => getBookmarkedLessons(bookmarkedLessonIds),
    [bookmarkedLessonIds],
  );

  const openLesson = (lessonId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();
    router.push({ pathname: "/lesson/[lessonId]", params: { lessonId } });
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <FlatList
        testID="courses-list"
        data={(searching ? results : COURSE_DATA.modules) as (
          | Module
          | LessonSearchResult
        )[]}
        keyExtractor={(item) =>
          "lesson" in item ? item.lesson.lessonId : item.id
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xxxl,
          gap: spacing.md,
        }}
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.sm }}>
            <Text style={[styles.eyebrow, { color: colors.brand }]}>
              PYTHON COURSE
            </Text>
            <Text style={[styles.h1, { color: colors.onSurface }]}>
              {COURSE_DATA.course.title}
            </Text>

            <View
              style={[
                styles.searchBar,
                {
                  backgroundColor: colors.surfaceSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="search" size={18} color={colors.muted} />
              <TextInput
                testID="lesson-search-input"
                value={query}
                onChangeText={setQuery}
                placeholder="Search lessons or topics"
                placeholderTextColor={colors.muted}
                style={[styles.searchInput, { color: colors.onSurface }]}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
              />
              {query.length > 0 && (
                <Pressable
                  testID="search-clear-button"
                  onPress={() => setQuery("")}
                  hitSlop={10}
                >
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={colors.muted}
                  />
                </Pressable>
              )}
            </View>

            {searching ? (
              results.length > 0 ? (
                <Text style={[styles.section, { color: colors.muted }]}>
                  RESULTS ({results.length})
                </Text>
              ) : null
            ) : (
              <>
                <LinearGradient
                  colors={
                    dark ? ["#2A4D6B", "#1C1C1E"] : [colors.brand, "#2C5F87"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.hero}
                >
                  <View style={styles.heroTopRow}>
                    <View>
                      <Text style={styles.heroLabel}>Overall progress</Text>
                      <Text style={styles.heroPct}>
                        {Math.round(overall.pct * 100)}%
                      </Text>
                    </View>
                    <View style={styles.heroBadge}>
                      <Ionicons name="logo-python" size={28} color="#FFD43B" />
                    </View>
                  </View>
                  <ProgressBar
                    progress={overall.pct}
                    height={10}
                    color="#FFD43B"
                    trackColor="rgba(255,255,255,0.25)"
                  />
                  <Text style={styles.heroMeta}>
                    {overall.done} of {overall.total} lessons complete •{" "}
                    {COURSE_DATA.modules.length} modules
                  </Text>
                </LinearGradient>

                <Text style={[styles.section, { color: colors.muted }]}>
                  SAVED LESSONS ({bookmarkedLessons.length}/{TOTAL_LESSONS})
                </Text>
                {bookmarkedLessons.length > 0 ? (
                  <View style={{ gap: spacing.sm }}>
                    {bookmarkedLessons.map((item) => (
                      <Pressable
                        key={item.lesson.lessonId}
                        testID={`saved-lesson-${item.lesson.lessonId}`}
                        onPress={() => openLesson(item.lesson.lessonId)}
                        style={({ pressed }) => [
                          styles.resultRow,
                          {
                            backgroundColor: colors.surfaceSecondary,
                            opacity: pressed ? 0.85 : 1,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.resultIcon,
                            { backgroundColor: colors.brandTertiary },
                          ]}
                        >
                          <MaterialCommunityIcons
                            name="star"
                            size={16}
                            color={colors.brandSecondary}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            numberOfLines={1}
                            style={[styles.resultTitle, { color: colors.onSurface }]}
                          >
                            {item.lesson.title}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={[styles.resultSub, { color: colors.muted }]}
                          >
                            Module {String(item.moduleIndex).padStart(2, "0")} •{" "}
                            {item.module.title}
                          </Text>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color={colors.muted}
                        />
                      </Pressable>
                    ))}
                  </View>
                ) : (
                  <View
                    testID="saved-lessons-empty-state"
                    style={[
                      styles.savedEmptyWrap,
                      { backgroundColor: colors.surfaceSecondary },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="star-outline"
                      size={20}
                      color={colors.muted}
                    />
                    <Text style={[styles.savedEmptyText, { color: colors.muted }]}>
                      No saved lessons yet. Star lessons to save them.
                    </Text>
                  </View>
                )}

                <Text style={[styles.section, { color: colors.muted }]}>
                  MODULES
                </Text>
              </>
            )}
          </View>
        }
        ListEmptyComponent={
          searching ? (
            <View style={styles.emptyWrap} testID="search-empty-state">
              <Ionicons name="search" size={32} color={colors.muted} />
              <Text style={[styles.emptyTitle, { color: colors.onSurface }]}>
                No lessons found
              </Text>
              <Text style={[styles.emptySub, { color: colors.muted }]}>
                Try a keyword like “loops”, “strings”, or “functions”.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item, index }) => {
          if ("lesson" in item) {
            const done = completedSet.has(item.lesson.lessonId);
            return (
              <Pressable
                testID={`search-result-${item.lesson.lessonId}`}
                onPress={() => openLesson(item.lesson.lessonId)}
                style={({ pressed }) => [
                  styles.resultRow,
                  {
                    backgroundColor: colors.surfaceSecondary,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.resultIcon,
                    {
                      backgroundColor: done
                        ? colors.success
                        : colors.brandTertiary,
                    },
                  ]}
                >
                  <Ionicons
                    name={done ? "checkmark" : "book-outline"}
                    size={16}
                    color={done ? colors.onSuccess : colors.brand}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={[styles.resultTitle, { color: colors.onSurface }]}
                  >
                    {item.lesson.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.resultSub, { color: colors.muted }]}
                  >
                    Module {String(item.moduleIndex).padStart(2, "0")} •{" "}
                    {item.module.title} • {item.lesson.time}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={colors.muted}
                />
              </Pressable>
            );
          }
          const { done, total } = getModuleProgress(item, completed);
          return (
            <ModuleCard
              module={item}
              index={index}
              done={done}
              total={total}
              onPress={() =>
                router.push({
                  pathname: "/module/[moduleId]",
                  params: { moduleId: item.id },
                })
              }
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  h1: { fontSize: 30, fontWeight: "800", marginTop: 2 },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "600",
  },
  heroPct: { color: "#FFFFFF", fontSize: 40, fontWeight: "800" },
  heroBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroMeta: { color: "rgba(255,255,255,0.85)", fontSize: 13 },
  section: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: spacing.xl,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.md,
    height: 46,
    marginTop: spacing.lg,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  resultIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  resultTitle: { fontSize: 15, fontWeight: "600" },
  resultSub: { fontSize: 12, marginTop: 2 },
  savedEmptyWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  savedEmptyText: { fontSize: 13, flex: 1 },
  emptyWrap: {
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xxl,
  },
  emptyTitle: { fontSize: 17, fontWeight: "700" },
  emptySub: { fontSize: 14, textAlign: "center" },
});
