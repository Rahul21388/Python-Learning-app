import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProgressBar } from "@/src/components/ProgressBar";
import { getModule, getModuleProgress } from "@/src/data/course";
import { useProgressStore } from "@/src/store/progressStore";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";

export default function ModuleDetailScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();

  const module = getModule(moduleId);
  const completed = useProgressStore((s) => s.lessonsCompleted);

  if (!module) {
    return (
      <View
        style={[
          styles.root,
          { backgroundColor: colors.surface, justifyContent: "center" },
        ]}
      >
        <Text style={{ color: colors.muted, textAlign: "center" }}>
          Module not found.
        </Text>
      </View>
    );
  }

  const { done, total, pct } = getModuleProgress(module, completed);
  const completedSet = new Set(completed);

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <FlatList
        data={module.lessons}
        keyExtractor={(l) => l.lessonId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + spacing.xxxl,
        }}
        ListHeaderComponent={
          <View
            style={{
              paddingTop: insets.top + spacing.sm,
              paddingHorizontal: spacing.lg,
            }}
          >
            <Pressable
              testID="back-button"
              onPress={() => router.back()}
              style={styles.backBtn}
              hitSlop={10}
            >
              <Ionicons name="chevron-back" size={22} color={colors.brand} />
              <Text style={[styles.backText, { color: colors.brand }]}>
                Courses
              </Text>
            </Pressable>

            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.brandTertiary },
              ]}
            >
              <Ionicons
                name={module.icon as any}
                size={28}
                color={colors.brand}
              />
            </View>
            <Text style={[styles.h1, { color: colors.onSurface }]}>
              {module.title}
            </Text>
            <Text style={[styles.desc, { color: colors.muted }]}>
              {module.description}
            </Text>

            <View style={styles.progressBox}>
              <View style={styles.progressTop}>
                <Text style={[styles.progressLabel, { color: colors.muted }]}>
                  {done} of {total} lessons
                </Text>
                <Text style={[styles.progressPct, { color: colors.brand }]}>
                  {Math.round(pct * 100)}%
                </Text>
              </View>
              <ProgressBar progress={pct} height={8} />
            </View>

            <Text style={[styles.section, { color: colors.muted }]}>
              LESSONS
            </Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const isDone = completedSet.has(item.lessonId);
          return (
            <Pressable
              testID={`lesson-row-${item.lessonId}`}
              onPress={() =>
                router.push({
                  pathname: "/lesson/[lessonId]",
                  params: { lessonId: item.lessonId },
                })
              }
              style={({ pressed }) => [
                styles.lessonRow,
                {
                  borderBottomColor: colors.divider,
                  backgroundColor: pressed
                    ? colors.surfaceSecondary
                    : "transparent",
                },
              ]}
            >
              <View
                style={[
                  styles.lessonNum,
                  {
                    backgroundColor: isDone
                      ? colors.success
                      : colors.surfaceSecondary,
                  },
                ]}
              >
                {isDone ? (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                ) : (
                  <Text style={[styles.lessonNumText, { color: colors.muted }]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <View style={styles.lessonBody}>
                <Text
                  numberOfLines={2}
                  style={[styles.lessonTitle, { color: colors.onSurface }]}
                >
                  {item.title}
                </Text>
                <Text style={[styles.lessonMeta, { color: colors.muted }]}>
                  {item.time} • {item.quiz.length} quiz Q
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </Pressable>
          );
        }}
      />
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
  backText: { fontSize: 16, fontWeight: "500" },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  h1: { fontSize: 26, fontWeight: "800" },
  desc: { fontSize: 15, lineHeight: 21, marginTop: 6 },
  progressBox: { marginTop: spacing.lg, gap: spacing.sm },
  progressTop: { flexDirection: "row", justifyContent: "space-between" },
  progressLabel: { fontSize: 13 },
  progressPct: { fontSize: 13, fontWeight: "700" },
  section: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: 64,
  },
  lessonNum: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumText: { fontSize: 14, fontWeight: "700" },
  lessonBody: { flex: 1, gap: 2 },
  lessonTitle: { fontSize: 16, fontWeight: "600" },
  lessonMeta: { fontSize: 13 },
});
