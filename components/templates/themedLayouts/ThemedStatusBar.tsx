import { useTheme } from "@/context/ThemeContext";
import { StatusBar, useColorScheme } from "react-native";

const ThemedStatusBar = () => {
  const colorScheme = useColorScheme(); // Get the system's color scheme
  const theme=useTheme()

  return (
    <StatusBar
      barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} // Dynamic bar style
      backgroundColor={colorScheme === "dark" ? theme.background : theme.background} // Dynamic background color
      translucent={true} // Optional: Make status bar translucent
    />
  );
};

export default ThemedStatusBar;
