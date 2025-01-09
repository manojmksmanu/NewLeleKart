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
    <View style={[styles.header, { backgroundColor: theme.secondaryBackground }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color={theme.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <TouchableOpacity onPress={navigationToSearch}>
        <Feather name="search" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // Improved drop shadow for both platforms
    shadowColor: "#ccc", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Slightly larger shadow offset
    shadowOpacity: 0.15, // Subtle shadow
    shadowRadius: 5, // Soft shadow radius
    elevation: 10, // Shadow for Android
    zIndex:100
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
