import { useProgressStore } from "@/src/store/progressStore";
import { ColorScheme, darkColors, lightColors } from "./colors";

export function useTheme(): { colors: ColorScheme; dark: boolean } {
  const darkMode = useProgressStore((s) => s.darkMode);
  return { colors: darkMode ? darkColors : lightColors, dark: darkMode };
}

export const CODE_FONT = "monospace";
