import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native"; // Import Rect


export const HeaderSkeleton = () => {
  const theme = useTheme();
  return (
    <View style={styles.shadowContainer}>
      {/* Shadow View */}
      <View style={styles.bottomShadow} />
      {/* Skeleton Header Content */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <ContentLoader
          speed={1}
          width="100%"
          height={60} // Adjust height to match the header
          viewBox="0 0 400 60" // Adjust viewBox to match the header dimensions
          backgroundColor={theme.secondaryBackground}
          foregroundColor={theme.primary}
        >
          {/* Back Button Skeleton */}
          <Rect x="20" y="18" rx="4" ry="4" width="24" height="24" />
          {/* Title Skeleton */}
          <Rect x="70" y="18" rx="4" ry="4" width="200" height="24" />
          {/* Search Button Skeleton */}
          <Rect x="350" y="18" rx="4" ry="4" width="24" height="24" />
        </ContentLoader>
      </View>
    </View>
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
