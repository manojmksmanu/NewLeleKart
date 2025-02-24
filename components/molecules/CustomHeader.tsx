import { useTheme } from "@/context/ThemeContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type CustomHeader = {
  title: string;
  extraFeature?: boolean; // Condition for additional features
};

const CustomHeader: React.FC<CustomHeader> = ({ title, extraFeature }) => {
  const router = useRouter();
  const theme = useTheme();
  const navigationToSearch = () => {
    router.push(`/(tab)/shop/search`);
  };

  return (
    <View style={styles.shadowContainer}>
      {/* Shadow View */}
      <View style={styles.bottomShadow} />
      {/* Header Content */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios-new"
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <TouchableOpacity onPress={navigationToSearch}>
          <Feather name="search" size={24} color={theme.text} />
        </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  extra: {
    fontSize: 14,
    color: "yellow",
  },
});

export default CustomHeader;
