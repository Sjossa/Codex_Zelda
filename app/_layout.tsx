import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Home" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="about" options={{ title: 'about', headerShown: false }} />

    </Stack>
  );
}
