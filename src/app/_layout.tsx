import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="solo_activity" />
      <Stack.Screen name="group_activity" />
      <Stack.Screen name="session_results" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="title" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}