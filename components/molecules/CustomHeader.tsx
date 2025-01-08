// app/components/CustomHeader.tsx

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
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color={theme.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {extraFeature && <Text style={styles.extra}>Extra Features Enabled</Text>}
      <Feather name="search" size={24} color={theme.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: "white",
  },
  extra: {
    fontSize: 14,
    color: "yellow",
  },
});

export default CustomHeader;
