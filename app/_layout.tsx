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
          <Stack.Screen name="pages/static/about" options={{ title: "About" }} />
          <Stack.Screen name="pages/auth/login" options={{ title: "Login" }} />
          <Stack.Screen name="pages/auth/signUp" options={{ title: "Sign Up" }} />
          <Stack.Screen name="pages/auth/verifyOtp" options={{ title: "Verify OTP" }} />
          <Stack.Screen name="pages/auth/forgotPassword" options={{ title: "Reset Your Password" }} />
        </Stack>
      </ToastProvider>
    </ThemeProvider>
  );
}
