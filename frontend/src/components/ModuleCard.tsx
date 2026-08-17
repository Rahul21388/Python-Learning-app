import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { Module } from "@/src/data/types";
import { spacing, radius } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";
import { ProgressBar } from "./ProgressBar";

interface Props {
  module: Module;
  index: number;
  done: number;
  total: number;
  onPress: () => void;
}

export function ModuleCard({ module, index, done, total, onPress }: Props) {
  const { colors } = useTheme();
  const pct = total > 0 ? done / total : 0;
  const complete = done === total && total > 0;

  return (
    <Pressable
      testID={`module-card-${module.id}`}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surfaceSecondary,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: complete ? colors.success : colors.brandTertiary },
        ]}
      >
        <Ionicons
          name={complete ? "checkmark" : (module.icon as any)}
          size={22}
          color={complete ? colors.onSuccess : colors.brand}
        />
      </View>

      <View style={styles.body}>
        <Text style={[styles.eyebrow, { color: colors.muted }]}>
          MODULE {String(index).padStart(2, "0")}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: colors.onSurface }]}
        >
          {module.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: colors.muted }]}>
            {total} lessons
          </Text>
          <Text style={[styles.pct, { color: colors.brand }]}>
            {Math.round(pct * 100)}%
          </Text>
        </View>
        <ProgressBar progress={pct} height={6} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.md,
    alignItems: "center",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  body: { flex: 1, gap: 4 },
  eyebrow: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  title: { fontSize: 16, fontWeight: "700" },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 6,
  },
  meta: { fontSize: 13 },
  pct: { fontSize: 13, fontWeight: "700" },
});
