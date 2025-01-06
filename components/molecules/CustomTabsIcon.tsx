// app/components/CustomTabIcon.tsx
import React from "react";
import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import { useTheme } from "../../context/ThemeContext"; // Adjust path accordingly

type CustomTabIconProps = {
  focused: boolean;
  lightModeIcon: { active: any; inactive: any };
  darkModeIcon: { active: any; inactive: any };
  name: string;
};

const CustomTabIcon: React.FC<CustomTabIconProps> = ({
  focused,
  lightModeIcon,
  darkModeIcon,
  name,
}) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  // Determine which icon to use based on the current theme and whether the tab is focused
  const icon =
    colorScheme === "dark" // Check for dark theme (adjust logic as needed)
      ? focused
        ? darkModeIcon.active
        : darkModeIcon.inactive
      : focused
      ? lightModeIcon.active
      : lightModeIcon.inactive;

  return (
    <View style={{width:50, display:'flex',alignItems:'center'}}>
      <Image source={icon} style={styles.icon} />
      <Text style={[styles.tabLabel,{color:theme.lightText}, focused && { color: theme.primary }]}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight:700,
    textAlign:'center'
  },
  focusedText: {
    color: "#0a7ea4", // Active tab color
  },
});

export default CustomTabIcon;
