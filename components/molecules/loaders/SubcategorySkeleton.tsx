import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View, StyleSheet } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native"; // Import Rect

export const SubcategorySkeleton = () => {
  const theme = useTheme(); // Use the theme inside the component

  return (
    <ContentLoader
      speed={1}
      width={300}
      height={50}
      viewBox="0 0 300 50"
      backgroundColor={theme.secondaryBackground}
      foregroundColor={theme.primary}
    >
      {/* Skeleton Rectangles for Subcategories */}
      <Rect x="0" y="0" rx="20" ry="20" width="60" height="30" />
      <Rect x="70" y="0" rx="20" ry="20" width="100" height="30" />
      <Rect x="180" y="0" rx="20" ry="20" width="80" height="30" />
      <Rect x="270" y="0" rx="20" ry="20" width="80" height="30" />
      <Rect x="360" y="0" rx="20" ry="20" width="80" height="30" />
    </ContentLoader>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    position: "relative", // Required for absolute positioning of the shadow
  },
  bottomShadow: {
    position: "absolute",
    bottom: 0, // Position the shadow at the bottom
    left: 0,
    right: 0,
    height: 5, // Height of the shadow
    backgroundColor: "#fff", // Match the background color of the header
    shadowColor: "#ccc", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow at the bottom
    shadowOpacity: 0.15, // Subtle shadow
    shadowRadius: 5, // Soft shadow radius
    elevation: 10, // Shadow for Android
    zIndex: 99, // Ensure the shadow is below the header content
  },
  header: {
    padding: 15,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent", // Make the header background transparent
    zIndex: 100, // Ensure the header stays above the shadow
  },
});
