import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: 'index',
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.background,
    text: Colors.textPrimary,
    border: Colors.border,
    primary: Colors.primary,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="country-select" options={{ presentation: 'modal' }} />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="event/[id]" />
        <Stack.Screen name="event/[id]/booked" />
        <Stack.Screen name="events/index" />
        <Stack.Screen name="wishlist" />
        <Stack.Screen name="search" />
        <Stack.Screen name="filter" options={{ presentation: 'modal' }} />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="invite-friends" />
        <Stack.Screen name="add-event" />
        <Stack.Screen name="edit-event/[id]" />
        <Stack.Screen name="profile/edit" options={{ presentation: 'modal' }} />
        <Stack.Screen name="profile/[organizerId]" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="help-faqs" />
        <Stack.Screen name="contact-us" />
        <Stack.Screen name="booking/[id]/tickets" />
        <Stack.Screen name="booking/[id]/covid" />
        <Stack.Screen name="booking/[id]/payment" />
        <Stack.Screen name="booking/[id]/add-card" options={{ presentation: 'modal' }} />
        <Stack.Screen name="booking/[id]/scan-card" />
        <Stack.Screen name="booking/[id]/ticket" />
        <Stack.Screen name="review/[eventId]" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
