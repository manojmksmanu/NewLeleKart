// context/ThemeContext.tsx

import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors"; // Adjust the path accordingly

// Define the type for theme values
type Theme = {
  text: string;
  lightText: string;
  background: string;
  primary: string;
  secondaryBackground: string;
  secondary: string;
  success: string;
  sale: string;
};

const ThemeContext = createContext<{ theme: Theme } | undefined>(undefined); // Set context type

export const ThemeProvider = ({ children }: any) => {
  const colorScheme = useColorScheme(); // Detect system theme (light or dark)

  // Set the theme based on the color scheme
  const theme: Theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.theme; // Return the theme object
};
