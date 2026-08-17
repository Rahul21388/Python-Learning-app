import { View } from "react-native";
import { useTheme } from "@/src/theme/useTheme";
import { radius } from "@/src/theme/colors";

interface Props {
  progress: number; // 0..1
  height?: number;
  color?: string;
  trackColor?: string;
  testID?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  color,
  trackColor,
  testID,
}: Props) {
  const { colors } = useTheme();
  const pct = Math.max(0, Math.min(1, progress || 0));
  return (
    <View
      testID={testID}
      style={{
        height,
        borderRadius: radius.pill,
        backgroundColor: trackColor ?? colors.surfaceTertiary,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${pct * 100}%`,
          borderRadius: radius.pill,
          backgroundColor: color ?? colors.brand,
        }}
      />
    </View>
  );
}
