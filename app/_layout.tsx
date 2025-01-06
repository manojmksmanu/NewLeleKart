import { ThemeProvider } from "@/context/ThemeContext"; // Adjust import
import { ToastProvider } from "@/context/ToastContainer";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Stack>
          <Stack.Screen name="(tab)" options={{ headerShown: false }} />
          <Stack.Screen name="cart" />
          <Stack.Screen name="pages/about" options={{ title: "About" }} />
        </Stack>
      </ToastProvider>
    </ThemeProvider>
  );
}
