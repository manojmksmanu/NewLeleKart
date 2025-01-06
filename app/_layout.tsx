import { ThemeProvider } from "@/context/ThemeContext"; // Adjust import
import { ToastProvider } from "@/context/ToastContainer";
import ThemedStack from "@/components/templates/themedLayouts/ThemedStack"; // Import the new component
import { StatusBar } from "react-native";
import ThemedStatusBar from "@/components/templates/themedLayouts/ThemedStatusBar";

export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ThemedStatusBar/>
        <ThemedStack /> {/* Use the ThemedStack component here */}
      </ToastProvider>
    </ThemeProvider>
  );
}
