import { ThemeProvider } from "@/context/ThemeContext"; // Adjust import
import { ToastProvider } from "@/context/ToastContainer";
import ThemedStack from "@/components/templates/themedLayouts/ThemedStack"; 
import ThemedStatusBar from "@/components/templates/themedLayouts/ThemedStatusBar";

export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ThemedStatusBar/>
        <ThemedStack /> 
      </ToastProvider>
    </ThemeProvider>
  );
}
