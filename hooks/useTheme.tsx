import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeState {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  preference: 'system',
  setPreference: (preference) => set({ preference }),
}));

export const THEME_PREFERENCE_KEY = 'theme_preference';

export async function loadSavedThemePreference(): Promise<ThemePreference | null> {
  try {
    const saved = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
    if (saved === 'system' || saved === 'light' || saved === 'dark') return saved;
    return null;
  } catch {
    return null;
  }
}

export async function saveThemePreference(pref: ThemePreference): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_PREFERENCE_KEY, pref);
  } catch {}
}


