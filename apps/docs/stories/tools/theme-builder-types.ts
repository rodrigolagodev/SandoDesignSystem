/**
 * Shared types, interfaces, and constants for the Theme Builder tool.
 *
 * This module is imported by all panel files and the root ThemeBuilder shell.
 * It contains no Lit or DOM code — pure data structures.
 */

// ---------------------------------------------------------------------------
// Event / State types
// ---------------------------------------------------------------------------

export interface PanelChangeDetail {
  tab: TabName;
  json: Record<string, unknown>;
  isReady: boolean;
}

export interface BuilderState {
  info?: PanelChangeDetail;
  colors?: PanelChangeDetail;
  typography?: PanelChangeDetail;
  shape?: PanelChangeDetail;
  motion?: PanelChangeDetail;
  elevation?: PanelChangeDetail;
}

export type TabName = "info" | "colors" | "typography" | "shape" | "motion" | "elevation";

// ---------------------------------------------------------------------------
// Flavor name validation — shared by Info panel and Colors panel
// ---------------------------------------------------------------------------

export const SYSTEM_FLAVORS = new Set([
  "sando",
  "original",
  "strawberry",
  "nori",
  "egg-salad",
  "kiwi",
  "tonkatsu",
]);

export function validateFlavorName(name: string): string | null {
  if (!name || name.trim() === "") return "Flavor name is required";
  if (!/^[a-zA-Z0-9-]+$/.test(name)) return "Use only letters, numbers, and hyphens";
  if (SYSTEM_FLAVORS.has(name.toLowerCase())) return "This name conflicts with a system flavor";
  return null;
}

// ---------------------------------------------------------------------------
// Font families — derived from packages/tokens/src/ingredients/font.json
// ---------------------------------------------------------------------------

export interface FontFamilyEntry {
  value: string;
  description: string;
  group: "sans-serif" | "serif" | "monospace" | "expressive";
}

export const FONT_FAMILIES: Record<string, FontFamilyEntry> = {
  // Sans-serif
  "sans": {
    value: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    description: "System sans-serif stack",
    group: "sans-serif",
  },
  "inter": {
    value: "'Inter', system-ui, -apple-system, sans-serif",
    description: "Premium UI sans — for Original flavor",
    group: "sans-serif",
  },
  "plus-jakarta": {
    value: "'Plus Jakarta Sans', system-ui, sans-serif",
    description: "Modern geometric — warm but professional",
    group: "sans-serif",
  },
  "dm-sans": {
    value: "'DM Sans', system-ui, sans-serif",
    description: "Clean geometric — contemporary",
    group: "sans-serif",
  },
  "space-grotesk": {
    value: "'Space Grotesk', system-ui, sans-serif",
    description: "Distinctive tech — craft/artisanal",
    group: "sans-serif",
  },
  "outfit": {
    value: "'Outfit', system-ui, sans-serif",
    description: "Geometric sans-serif — warm precision for headings",
    group: "sans-serif",
  },
  "source-sans": {
    value: "'Source Sans 3', system-ui, sans-serif",
    description: "Adobe humanist sans — warm readability for body text",
    group: "sans-serif",
  },
  "condensed": {
    value: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    description: "Condensed sans-serif",
    group: "sans-serif",
  },
  // Serif
  "serif": {
    value: "Georgia, Cambria, 'Times New Roman', Times, serif",
    description: "System serif stack",
    group: "serif",
  },
  "cormorant": {
    value: "'Cormorant Garamond', Didot, Georgia, serif",
    description: "Elegant display serif — luxury",
    group: "serif",
  },
  "literata": {
    value: "'Literata', Georgia, serif",
    description: "Humanist serif — readable, warm",
    group: "serif",
  },
  "newsreader": {
    value: "'Newsreader', Georgia, serif",
    description: "Transitional serif — calm, editorial",
    group: "serif",
  },
  "merriweather": {
    value: "'Merriweather', Georgia, serif",
    description: "Robust slab-serif — craft feel",
    group: "serif",
  },
  "display-serif": {
    value: "'Playfair Display', Didot, Georgia, serif",
    description: "Elegant display serif",
    group: "serif",
  },
  "slab": {
    value: "'Roboto Slab', Rockwell, Georgia, serif",
    description: "Roboto Slab",
    group: "serif",
  },
  // Monospace
  "mono": {
    value: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    description: "System monospace stack",
    group: "monospace",
  },
  "jetbrains-mono": {
    value: "'JetBrains Mono', Consolas, monospace",
    description: "Coding-optimized mono with ligatures",
    group: "monospace",
  },
  "fira-code": {
    value: "'Fira Code', Consolas, monospace",
    description: "Mozilla heritage, warm mono",
    group: "monospace",
  },
  // Expressive
  "display": {
    value: "'Bebas Neue', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    description: "Bold display / headlines",
    group: "expressive",
  },
  "rounded": {
    value: "'Nunito', Verdana, sans-serif",
    description: "Rounded, friendly",
    group: "expressive",
  },
  "handwritten": {
    value: "'Caveat', 'Brush Script MT', cursive",
    description: "Handwritten / casual",
    group: "expressive",
  },
};

// Mono-only keys (for Code Family selector)
export const MONO_FONT_KEYS = ["mono", "jetbrains-mono", "fira-code"] as const;

// ---------------------------------------------------------------------------
// Shape presets
// ---------------------------------------------------------------------------

export type ShapePreset = "sharp" | "precise" | "rounded" | "expressive";

export interface ShapeValues {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export const SHAPE_PRESETS: Record<ShapePreset, ShapeValues> = {
  sharp:      { xs: "0rem",    sm: "0.125rem", md: "0.25rem",  lg: "0.25rem"  },
  precise:    { xs: "0.125rem",sm: "0.25rem",  md: "0.5rem",   lg: "0.75rem"  },
  rounded:    { xs: "0.25rem", sm: "0.5rem",   md: "0.75rem",  lg: "1rem"     },
  expressive: { xs: "0.5rem",  sm: "1rem",     md: "1.25rem",  lg: "9999px"   },
};

export const BORDER_WIDTH_OPTIONS: Array<{ label: string; value: string }> = [
  { label: "width-50 (1px)",  value: "1px"  },
  { label: "width-100 (2px)", value: "2px"  },
  { label: "width-150 (3px)", value: "3px"  },
  { label: "width-200 (4px)", value: "4px"  },
];

// ---------------------------------------------------------------------------
// Motion presets
// ---------------------------------------------------------------------------

export type MotionPreset = "subtle" | "standard" | "expressive";
export type EasingName =
  | "gentle"
  | "ease-out"
  | "smooth"
  | "ease-in-out"
  | "energetic"
  | "organic"
  | "bounce";

export const EASING_VALUES: Record<EasingName, string> = {
  "gentle":     "cubic-bezier(0.4,0.1,0.6,0.9)",
  "ease-out":   "cubic-bezier(0,0,0.2,1)",
  "smooth":     "cubic-bezier(0.45,0.05,0.55,0.95)",
  "ease-in-out":"cubic-bezier(0.4,0,0.2,1)",
  "energetic":  "cubic-bezier(0.2,0.8,0.2,1)",
  "organic":    "cubic-bezier(0.42,0,0.58,1)",
  "bounce":     "cubic-bezier(0.68,-0.55,0.265,1.55)",
};

export interface MotionTier {
  duration: string;
  easing: EasingName;
}

export interface MotionPresetValues {
  micro: MotionTier;
  standard: MotionTier;
  expressive: MotionTier;
}

export const MOTION_PRESETS: Record<MotionPreset, MotionPresetValues> = {
  subtle: {
    micro:      { duration: "100ms", easing: "gentle"     },
    standard:   { duration: "200ms", easing: "ease-out"   },
    expressive: { duration: "300ms", easing: "smooth"     },
  },
  standard: {
    micro:      { duration: "100ms", easing: "ease-out"   },
    standard:   { duration: "300ms", easing: "ease-in-out"},
    expressive: { duration: "500ms", easing: "energetic"  },
  },
  expressive: {
    micro:      { duration: "200ms", easing: "energetic"  },
    standard:   { duration: "500ms", easing: "organic"    },
    expressive: { duration: "700ms", easing: "bounce"     },
  },
};

// ---------------------------------------------------------------------------
// Elevation
// ---------------------------------------------------------------------------

export type ShadowIntensity = "light" | "default" | "deep";

export const SHADOW_INTENSITY_MULTIPLIER: Record<ShadowIntensity, number> = {
  light:   0.65,
  default: 1.0,
  deep:    1.5,
};

/** Shadow layer descriptors — opacities are multiplied by the intensity factor at runtime */
export interface ShadowLayer {
  offsetY: string;
  blur: string;
  lightness: number;
  chroma: number;
  baseOpacity: number;
}

export interface ElevationLevel {
  key: string;
  label: string;
  layers: ShadowLayer[];
}

export const ELEVATION_LEVELS: ElevationLevel[] = [
  { key: "0",   label: "elevation-0",   layers: [] },
  {
    key: "100", label: "elevation-100",
    layers: [
      { offsetY: "1px",  blur: "2px",  lightness: 0.25, chroma: 0.02, baseOpacity: 0.06 },
      { offsetY: "1px",  blur: "3px",  lightness: 0.30, chroma: 0.02, baseOpacity: 0.08 },
    ],
  },
  {
    key: "200", label: "elevation-200",
    layers: [
      { offsetY: "2px",  blur: "4px",  lightness: 0.25, chroma: 0.02, baseOpacity: 0.06 },
      { offsetY: "4px",  blur: "8px",  lightness: 0.30, chroma: 0.02, baseOpacity: 0.10 },
    ],
  },
  {
    key: "300", label: "elevation-300",
    layers: [
      { offsetY: "4px",  blur: "8px",  lightness: 0.20, chroma: 0.02, baseOpacity: 0.08 },
      { offsetY: "12px", blur: "24px", lightness: 0.25, chroma: 0.02, baseOpacity: 0.12 },
    ],
  },
  {
    key: "400", label: "elevation-400",
    layers: [
      { offsetY: "8px",  blur: "16px", lightness: 0.20, chroma: 0.02, baseOpacity: 0.10 },
      { offsetY: "20px", blur: "40px", lightness: 0.20, chroma: 0.02, baseOpacity: 0.14 },
    ],
  },
  {
    key: "500", label: "elevation-500",
    layers: [
      { offsetY: "12px", blur: "24px", lightness: 0.18, chroma: 0.02, baseOpacity: 0.12 },
      { offsetY: "32px", blur: "64px", lightness: 0.18, chroma: 0.02, baseOpacity: 0.18 },
    ],
  },
];

/** Build a CSS box-shadow string from an elevation level, hue, and intensity multiplier */
export function buildShadowValue(level: ElevationLevel, hue: number, multiplier: number): string {
  if (level.layers.length === 0) return "none";
  return level.layers
    .map((layer) => {
      const opacity = Math.min(layer.baseOpacity * multiplier, 0.35);
      return `0 ${layer.offsetY} ${layer.blur} oklch(${layer.lightness} ${layer.chroma} ${hue} / ${opacity.toFixed(3)})`;
    })
    .join(", ");
}
