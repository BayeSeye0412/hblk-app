import { Stack } from 'expo-router/stack';

export default function RootLayout() {
  return (
    <Stack>
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