import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View, StyleSheet } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native"; // Import Rect

export const ProductSkeleton = () => {
  const theme = useTheme(); // Use the theme inside the component

  return (
    <View style={styles.container}>
      {/* First Row */}
      <View style={styles.row}>
        {/* Product 1 */}
        <View style={styles.productCard}>
          <ContentLoader
            speed={1}
            width="100%"
            height={230} // Increased height to accommodate all Rect components
            viewBox="0 0 200 250" // Adjusted viewBox to match the height
            backgroundColor={theme.secondaryBackground}
            foregroundColor={theme.primary}
          >
            {/* Product Image Skeleton */}
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height="180" />
            {/* Product Title Skeleton */}
            <Rect x="0" y="190" rx="4" ry="4" width="80%" height="16" />
            {/* Product Price Skeleton */}
            <Rect x="0" y="215" rx="4" ry="4" width="50%" height="14" />
          </ContentLoader>
        </View>

        {/* Product 2 */}
        <View style={styles.productCard}>
          <ContentLoader
            speed={1}
            width="100%"
            height={230} // Increased height to accommodate all Rect components
            viewBox="0 0 200 250" // Adjusted viewBox to match the height
            backgroundColor={theme.secondaryBackground}
            foregroundColor={theme.primary}
          >
            {/* Product Image Skeleton */}
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height="180" />
            {/* Product Title Skeleton */}
            <Rect x="0" y="190" rx="4" ry="4" width="80%" height="16" />
            {/* Product Price Skeleton */}
            <Rect x="0" y="215" rx="4" ry="4" width="50%" height="14" />
          </ContentLoader>
        </View>
      </View>

      {/* Second Row */}
      <View style={styles.row}>
        {/* Product 3 */}
        <View style={styles.productCard}>
          <ContentLoader
            speed={1}
            width="100%"
            height={230} // Increased height to accommodate all Rect components
            viewBox="0 0 200 250" // Adjusted viewBox to match the height
            backgroundColor={theme.secondaryBackground}
            foregroundColor={theme.primary}
          >
            {/* Product Image Skeleton */}
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height="180" />
            {/* Product Title Skeleton */}
            <Rect x="0" y="190" rx="4" ry="4" width="80%" height="16" />
            {/* Product Price Skeleton */}
            <Rect x="0" y="215" rx="4" ry="4" width="50%" height="14" />
          </ContentLoader>
        </View>

        {/* Product 4 */}
        <View style={styles.productCard}>
          <ContentLoader
            speed={1}
            width="100%"
            height={230} // Increased height to accommodate all Rect components
            viewBox="0 0 200 250" // Adjusted viewBox to match the height
            backgroundColor={theme.secondaryBackground}
            foregroundColor={theme.primary}
          >
            {/* Product Image Skeleton */}
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height="180" />
            {/* Product Title Skeleton */}
            <Rect x="0" y="190" rx="4" ry="4" width="80%" height="16" />
            {/* Product Price Skeleton */}
            <Rect x="0" y="215" rx="4" ry="4" width="50%" height="14" />
          </ContentLoader>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 40,
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productCard: {
    width: "48%", // Adjust width to fit two products in a row
    borderRadius: 8,
    overflow: "hidden",
  },
});
