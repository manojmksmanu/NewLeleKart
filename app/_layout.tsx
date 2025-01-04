import { ThemeProvider } from "@/context/ThemeContext"; // Adjust import
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" />
      </Stack>
    </ThemeProvider>
  );
}
