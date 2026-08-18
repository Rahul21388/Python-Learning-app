import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef } from "react";
import { Image, LogBox, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { BadgeUnlockToast } from "@/src/components/BadgeUnlockToast";
import { useIconFonts } from "@/src/hooks/use-icon-fonts";
import { useProgressStore } from "@/src/store/progressStore";
import { useTheme } from "@/src/theme/useTheme";
import { silentlyResyncDailyReminder } from "@/src/utils/reminders";

// Disable logbox errors etc so that users can see the app
// and agent works as expected.
LogBox.ignoreAllLogs(true);

// The native splash (app.json) is just a flat background color — Android 12+
// only supports a small centered icon there, not our full illustration. We
// hide it the instant our own full-screen splash image has painted, so the
// two hand off without a visible flash, then swap to the real app once icon
// fonts register. (@expo/vector-icons' componentDidMount fallback fires
// Font.loadAsync against a broken vendor path if any <Icon> mounts before
// the family is registered — which throws on Android Expo Go.)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useIconFonts();
  const { dark } = useTheme();
  const hasHydrated = useProgressStore((s) => s._hasHydrated);

  const onSplashLayout = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  // Once on cold start, re-arm the OS-level daily reminder from persisted
  // settings (covers a reinstall/update wiping the OS schedule). Never
  // prompts for permission itself — see silentlyResyncDailyReminder.
  const resyncedRef = useRef(false);
  useEffect(() => {
    if (!hasHydrated || resyncedRef.current) return;
    resyncedRef.current = true;
    const { dailyReminderEnabled, dailyReminderHour, dailyReminderMinute } =
      useProgressStore.getState();
    void silentlyResyncDailyReminder(
      dailyReminderEnabled,
      dailyReminderHour,
      dailyReminderMinute,
    );
  }, [hasHydrated]);

  // If the CDN is unreachable we fall through on error rather than wedging
  // the app — icons will tofu, but the app still boots.
  if (!loaded && !error) {
    return (
      <View style={styles.splash} onLayout={onSplashLayout}>
        <Image
          source={require("@/assets/images/splash-image.png")}
          style={styles.splashImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={dark ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="module/[moduleId]" />
          <Stack.Screen name="lesson/[lessonId]" />
        </Stack>
        <BadgeUnlockToast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#01071C",
  },
  splashImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
