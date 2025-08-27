/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#4CAF50';
const tintColorDark = '#fff';

export type ThemeName = 'light' | 'dark';

export interface ThemePalette {
  text: string;
  textSecondary: string;
  background: string;
  surface: string;
  tint: string;
  accent: string;
  accentSecondary: string;
  icon: string;
  border: string;
  tabIconDefault: string;
  tabIconSelected: string;
  error: string;
  success: string;
  headerBackground: string;
  headerForeground: string;
  statusBarStyle: 'light' | 'dark';
}

export const Colors: Record<ThemeName, ThemePalette> = {
  light: {
    text: '#11181C',
    textSecondary: '#687076',
    background: '#ffffff',
    surface: '#ffffff',
    tint: tintColorLight,
    accent: '#4CAF50',
    accentSecondary: '#EEA625',
    icon: '#000000',
    border: '#ECECEC',
    tabIconDefault: '#000000',
    tabIconSelected: tintColorLight,
    error: '#FF6B6B',
    success: '#4CAF50',
    headerBackground: '#ffffff',
    headerForeground: '#000000',
    statusBarStyle: 'dark',
  },
  dark: {
    text: '#E0E0E0',
    textSecondary: '#B0B0B0',
    background: '#121212',
    surface: '#1E1E1E',
    tint: tintColorDark,
    accent: '#4CAF50',
    accentSecondary: '#EEA625',
    icon: '#E0E0E0',
    border: '#2C2C2C',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',
    error: '#FF6B6B',
    success: '#4CAF50',
    headerBackground: '#1E1E1E',
    headerForeground: '#FFFFFF',
    statusBarStyle: 'light',
  },
};
