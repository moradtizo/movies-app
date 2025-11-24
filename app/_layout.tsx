import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { WatchlistProvider } from '@/contexts/WatchlistContext';

// Custom theme with #242A32 background
const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#242A32',
    card: '#2E3540',
    text: '#FFFFFF',
    border: '#3A4149',
    primary: '#4A9EFF',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={CustomTheme}>
      <WatchlistProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#242A32',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="movie" options={{ title: 'Details' }} />
        </Stack>
        <StatusBar style="light" />
      </WatchlistProvider>
    </ThemeProvider>
  );
}
