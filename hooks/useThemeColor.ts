/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, ThemeName } from '@/constants/Colors';
import { Appearance } from 'react-native';
import { useThemeStore, loadSavedThemePreference } from './useTheme';
import { useEffect, useState } from 'react';

export function useResolvedTheme(): ThemeName {
  const { preference, setPreference } = useThemeStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadSavedThemePreference().then((saved) => {
      if (saved) setPreference(saved);
      setHydrated(true);
    });
  }, [setPreference]);

  const system = Appearance.getColorScheme() ?? 'light';
  const effective = preference === 'system' ? system : preference;
  return (effective as ThemeName) || 'light';
}

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useResolvedTheme();
  const colorFromProps = props[theme];
  return colorFromProps ?? Colors[theme][colorName];
}
