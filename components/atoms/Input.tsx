import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/context/ThemeContext";

interface CustomInputProps {
  placeholder?: string;
  setText?: (text: string) => void;
  value: any;
  secure?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  setText,
  placeholder,
  value,
  secure = false,
}) => {
  const [isSecure, setIsSecure] = useState(secure);
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const placeholderStyle = {
    position: "absolute" as const, // Explicitly set as a valid type
    left: 25,
    top: animatedValue.interpolate({
      inputRange: [0, 2],
      outputRange: [19.5, 0],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.lightText, theme.lightText],
    }),
  };

  return (
    <View
      style={[
        styles.InputContainer,
        {
          borderColor: isFocused ? theme.primary : "#e0e0e0",
          backgroundColor: theme.secondaryBackground,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 1.5, // For Android
        },
      ]}
    >
      <Animated.Text style={[styles.placeholder, placeholderStyle]}>
        {placeholder}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={(text) => setText && setText(text)}
        style={[styles.input, { color: theme.text }]}
        secureTextEntry={isSecure}
        keyboardType={secure ? "default" : "email-address"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {secure && (
        <TouchableOpacity
          onPress={() => setIsSecure((prev) => !prev)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isSecure ? "eye-off-outline" : "eye-outline"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 64,
    borderRadius: 4,
    marginVertical: 10,
    position: "relative",
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    marginTop: 10, // Adjusted for better alignment
    height: "100%", // Ensure the input takes full height
  },
  placeholder: {
    position: "absolute",
    left: 20,
    color: "#aaa",
  },
  eyeIcon: {
    marginLeft: 10,
  },
});

export default CustomInput;
