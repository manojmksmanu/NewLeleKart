import { ThemeProvider } from "@/context/ThemeContext"; // Adjust import
import { ToastProvider } from "@/context/ToastContainer";
import ThemedStack from "@/components/templates/themedLayouts/ThemedStack";
import ThemedStatusBar from "@/components/templates/themedLayouts/ThemedStatusBar";
import { LoadingProvider } from "@/context/FullScreenLoaderContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <LoadingProvider>
          <ThemedStatusBar />
          <ThemedStack />
        </LoadingProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
