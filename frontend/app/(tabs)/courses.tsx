import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ModuleCard } from "@/src/components/ModuleCard";
import { ProgressBar } from "@/src/components/ProgressBar";
import {
  COURSE_DATA,
  getModuleProgress,
  getOverallProgress,
} from "@/src/data/course";
import { useProgressStore } from "@/src/store/progressStore";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";

export default function CoursesScreen() {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const completed = useProgressStore((s) => s.lessonsCompleted);
  const overall = getOverallProgress(completed);

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <FlatList
        testID="courses-list"
        data={COURSE_DATA.modules}
        keyExtractor={(m) => m.id}
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

            <LinearGradient
              colors={
                dark
                  ? ["#2A4D6B", "#1C1C1E"]
                  : [colors.brand, "#2C5F87"]
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
              MODULES
            </Text>
          </View>
        }
        renderItem={({ item, index }) => {
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
});
