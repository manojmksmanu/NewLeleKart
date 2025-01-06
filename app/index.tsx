import { ToastProvider } from "@/context/ToastContainer";
import { ThemeProvider } from "../context/ThemeContext"; // Adjust import path
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Redirect href="/(tab)" />
      </ToastProvider>
    </ThemeProvider>
  );
}
