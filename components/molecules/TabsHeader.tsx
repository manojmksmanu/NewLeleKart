// app/components/CustomHeader.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";

type CustomHeaderProps = {
  title: string;
  extraFeature?: boolean; // Condition for additional features
};

const TabsHeader: React.FC<CustomHeaderProps> = ({ title, extraFeature }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {extraFeature && <Text style={styles.extra}>Extra Features Enabled</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6200ee",
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  extra: {
    fontSize: 14,
    color: "yellow",
    marginTop: 5,
  },
});

export default TabsHeader;
