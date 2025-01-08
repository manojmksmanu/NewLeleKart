import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export default function StarRating({ rating }: any) {
    const theme = useTheme()
  // Create an array of stars based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesome key={i} name="star" size={20} color="#FFBA49" />);
    } else if (i - 0.5 === rating) {
      stars.push(
        <FontAwesome key={i} name="star-half-full" size={20} color="#FFBA49" />
      );
    } else {
      stars.push(
        <FontAwesome key={i} name="star-o" size={20} color={theme.lightText} />
      );
    }
  }

  return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 8,
    fontSize: 18,
    color: "#333",
  },
});
