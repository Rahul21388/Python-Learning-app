export interface ColorScheme {
  surface: string;
  onSurface: string;
  surfaceSecondary: string;
  onSurfaceSecondary: string;
  surfaceTertiary: string;
  onSurfaceTertiary: string;
  brand: string;
  onBrand: string;
  brandSecondary: string;
  onBrandSecondary: string;
  brandTertiary: string;
  onBrandTertiary: string;
  success: string;
  onSuccess: string;
  warning: string;
  error: string;
  onError: string;
  info: string;
  border: string;
  borderStrong: string;
  divider: string;
  muted: string;
}

export const lightColors: ColorScheme = {
  surface: "#FFFFFF",
  onSurface: "#000000",
  surfaceSecondary: "#F2F2F7",
  onSurfaceSecondary: "#1C1C1E",
  surfaceTertiary: "#E5E5EA",
  onSurfaceTertiary: "#3A3A3C",
  brand: "#3776AB",
  onBrand: "#FFFFFF",
  brandSecondary: "#FFD43B",
  onBrandSecondary: "#1C1C1E",
  brandTertiary: "#E6F0F9",
  onBrandTertiary: "#3776AB",
  success: "#34C759",
  onSuccess: "#FFFFFF",
  warning: "#FFCC00",
  error: "#FF3B30",
  onError: "#FFFFFF",
  info: "#007AFF",
  border: "#E5E5EA",
  borderStrong: "#C7C7CC",
  divider: "#C6C6C8",
  muted: "#8E8E93",
};

export const darkColors: ColorScheme = {
  surface: "#000000",
  onSurface: "#FFFFFF",
  surfaceSecondary: "#1C1C1E",
  onSurfaceSecondary: "#EBEBF5",
  surfaceTertiary: "#2C2C2E",
  onSurfaceTertiary: "#EBEBF5",
  brand: "#4B8BBE",
  onBrand: "#FFFFFF",
  brandSecondary: "#FFE873",
  onBrandSecondary: "#1C1C1E",
  brandTertiary: "#2A4D6B",
  onBrandTertiary: "#FFFFFF",
  success: "#32D74B",
  onSuccess: "#FFFFFF",
  warning: "#FFD60A",
  error: "#FF453A",
  onError: "#FFFFFF",
  info: "#0A84FF",
  border: "#38383A",
  borderStrong: "#48484A",
  divider: "#38383A",
  muted: "#8E8E93",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
};
