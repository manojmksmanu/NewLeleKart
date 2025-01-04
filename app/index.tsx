import { ThemeProvider } from "../context/ThemeContext"; // Adjust import path
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <ThemeProvider>
      <Redirect href="/(tab)" />
    </ThemeProvider>
  );
}
