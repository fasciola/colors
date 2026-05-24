export interface PaletteColors {
  primary: string;
  secondary: string;
  accent: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
  success: string;
  error: string;
}

export interface PaletteNames {
  primary: string;
  secondary: string;
  accent: string;
  bgLight: string;
  bgDark: string;
}

export interface CustomCopyFeature {
  title: string;
  description: string;
}

export interface CustomCopy {
  heroTitle: string;
  heroSubtitle: string;
  features: CustomCopyFeature[];
}

export interface TypographyGuide {
  headingFont: string;
  bodyFont: string;
  letterSpacing?: string;
}

export interface ColorPalette {
  name: string;
  mood: string;
  praise: string;
  colors: PaletteColors;
  names: PaletteNames;
  customCopy: CustomCopy;
  typography: TypographyGuide;
}

export interface SavedPalette extends ColorPalette {
  id: string;
  createdAt: string;
  isFavorite?: boolean;
}

export type PreviewTemplate = "saas" | "ecommerce" | "creative" | "dashboard";
export type DeviceViewMode = "mobile" | "tablet" | "desktop";
