import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View, StyleSheet } from "react-native";
import ContentLoader, { Circle } from "react-content-loader/native";

export const CircularLoader = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ContentLoader
        speed={1}
        width={100} // Adjust width to match the container size
        height={100} // Adjust height to match the container size
        viewBox="0 0 100 100" // Adjust viewBox to match the dimensions
        backgroundColor={theme.secondaryBackground}
        foregroundColor={theme.primary}
      >
        {/* Circular Loader */}
        <Circle cx="50" cy="50" r="50" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
