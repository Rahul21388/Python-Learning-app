import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BADGES } from "@/src/data/achievements";
import { useProgressStore } from "@/src/store/progressStore";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";

const AUTO_DISMISS_MS = 3200;

// Renders the oldest pending badge unlock as a top banner, app-wide, so it
// fires no matter which screen triggered it (lesson complete or quiz score).
export function BadgeUnlockToast() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const currentId = useProgressStore((s) => s.newlyUnlocked[0]);
  const dismissBadge = useProgressStore((s) => s.dismissBadge);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!currentId) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    anim.setValue(0);
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
    }).start();
    const timer = setTimeout(() => dismissBadge(currentId), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [currentId, anim, dismissBadge]);

  const badge = BADGES.find((b) => b.id === currentId);
  if (!badge) return null;

  return (
    <Animated.View
      testID="badge-unlock-toast"
      pointerEvents="box-none"
      style={[
        styles.wrap,
        {
          top: insets.top + spacing.sm,
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [-30, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Pressable
        testID="badge-unlock-dismiss"
        onPress={() => dismissBadge(badge.id)}
        style={[styles.card, { backgroundColor: colors.brandSecondary }]}
      >
        <View
          style={[styles.iconWrap, { backgroundColor: colors.onBrandSecondary }]}
        >
          <Ionicons
            name={badge.icon as any}
            size={22}
            color={colors.brandSecondary}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.eyebrow, { color: colors.onBrandSecondary }]}>
            Achievement unlocked
          </Text>
          <Text style={[styles.title, { color: colors.onBrandSecondary }]}>
            {badge.title}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 999,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: { fontSize: 11, fontWeight: "700", opacity: 0.75, letterSpacing: 0.5 },
  title: { fontSize: 16, fontWeight: "800" },
});
