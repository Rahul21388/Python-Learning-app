import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Image, LogBox, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useIconFonts } from "@/src/hooks/use-icon-fonts";
import { useProgressStore } from "@/src/store/progressStore";

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
  const darkMode = useProgressStore((s) => s.darkMode);

  const onSplashLayout = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

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
        <StatusBar style={darkMode ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="module/[moduleId]" />
          <Stack.Screen name="lesson/[lessonId]" />
        </Stack>
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
