import { useTheme } from "@/context/ThemeContext";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type ButtonPrimaryBigProps = {
  text: string;
  onPress: () => void;
};

export function ButtonPrimaryBig({ text, onPress }: ButtonPrimaryBigProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.primary }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: theme.buttonText }]}>
        {text.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    // height:48,
    width: "90%",
    // marginHorizontal:20
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});


export function ButtonOutlinBig({ text, onPress }: ButtonPrimaryBigProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles1.button, { borderColor: theme.text, borderWidth: 2 }]}
      onPress={onPress}
    >
      <Text style={[styles1.buttonText, { color: theme.text }]}>
        {text.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
const styles1 = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,

    // height:48,
    width: "90%",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});


export function ButtonPrimarySmall({ text, onPress }: ButtonPrimaryBigProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles2.button, { backgroundColor: theme.primary }]}
      onPress={onPress}
    >
      <Text style={[styles2.buttonText, { color: theme.buttonText }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
const styles2 = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    // height:48,
    width: "90%",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});


export function ButtonOutlineSmall({ text, onPress }: ButtonPrimaryBigProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles3.button, { borderColor: theme.text, borderWidth: 2 }]}
      onPress={onPress}
    >
      <Text style={[styles3.buttonText, { color: theme.text }]}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles3 = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    // height:48,
    width: "90%",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
