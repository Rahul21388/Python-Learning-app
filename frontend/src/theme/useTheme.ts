import { useColorScheme } from "react-native";
import { useProgressStore } from "@/src/store/progressStore";
import { ColorScheme, darkColors, lightColors } from "./colors";

export function useTheme(): { colors: ColorScheme; dark: boolean } {
  const themePreference = useProgressStore((s) => s.themePreference);
  const systemScheme = useColorScheme();
  const dark =
    themePreference === "dark" ||
    (themePreference === "system" && systemScheme === "dark");
  return { colors: dark ? darkColors : lightColors, dark };
}

export const CODE_FONT = "monospace";
