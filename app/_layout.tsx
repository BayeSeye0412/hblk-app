import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { useResolvedTheme } from '@/hooks/useThemeColor';

export default function RootLayout() {
  const theme = useResolvedTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors[theme].background },
        headerStyle: { backgroundColor: Colors[theme].headerBackground },
        headerTintColor: Colors[theme].headerForeground,
      }}
    >
      <StatusBar style={Colors[theme].statusBarStyle} backgroundColor={Colors[theme].headerBackground} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pdf" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ 
        title: 'Menu',
        presentation: 'modal'
      }} />
      <Stack.Screen name="search" options={{ 
        title: 'Recherche',
        presentation: 'modal'
      }} />
      <Stack.Screen name="settings" options={{ 
        title: 'Paramètres',
        presentation: 'modal'
      }} />
    </Stack>
  );
}