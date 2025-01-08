import { Stack } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const ThemedStack = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background, // Dynamic background color
        },
        headerTintColor: theme.text, // Dynamic text color
        headerTitleStyle: {
          fontWeight: "medium",
        },
      }}
    >
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="cart" />
      <Stack.Screen name="pages/static/about" options={{ title: "About" }} />
      <Stack.Screen
        name="pages/static/paymentInfo"
        options={{ title: "Payment Information" }}
      />
      <Stack.Screen
        name="pages/static/privacyPolicy"
        options={{ title: "Privacy Policy" }}
      />
      <Stack.Screen
        name="pages/static/refundAndCancellationPolicy"
        options={{ title: "Refund and cancellation policy" }}
      />
      <Stack.Screen
        name="pages/static/safeAndSecure"
        options={{ title: "Safe and secure" }}
      />
      <Stack.Screen
        name="pages/static/shippingAndReturnPolicy"
        options={{ title: "Shipping and returns" }}
      />
      <Stack.Screen name="pages/auth/login" options={{ title: "Login" }} />
      <Stack.Screen name="pages/auth/signUp" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="pages/auth/verifyOtp"
        options={{ title: "Verify OTP" }}
      />
      <Stack.Screen
        name="pages/auth/forgotPassword"
        options={{ title: "Reset Your Password" }}
      />
      <Stack.Screen
        name="pages/productPages/CategoryProduct"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pages/productPages/ProductDetais"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default ThemedStack;
