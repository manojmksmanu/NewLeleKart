import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Animated,
} from "react-native";

// Accept the type as "info", "success", "error", or any string
interface CustomToastProps {
  message: string;
  type: "info" | "success" | "error" | string; // Allow string or specific types
  duration: number;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  message,
  type,
  duration = 2000,
  onClose,
}) => {
  const [show, setShow] = useState(true);
  const [translateY] = useState(new Animated.Value(100)); // Start position below the screen

  const backgroundColor =
    type === "success" ? "#28a745" : type === "error" ? "#df362a" : "#6c757d";

  // Set icons based on type
  const icon: ImageSourcePropType =
    type === "success"
      ? require("../../assets/icons/check.png") // Replace with your success icon
      : type === "error"
      ? require("../../assets/icons/mark.png") // Replace with your error icon
      : require("../../assets/icons/about.png"); // Replace with your info icon

  // Animate toast to come from the bottom
  const showToast = () => {
    Animated.spring(translateY, {
      toValue: 0, // Final position (top of the screen)
      friction: 5, // Bounciness of the animation
      tension: 100, // Speed of the bounce
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // When the component mounts, trigger the toast animation
  useEffect(() => {
    showToast();

    const timer = setTimeout(() => {
      // Start hide animation after duration
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Animate toast to go back down with a bounce effect
  const hideToast = () => {
    Animated.spring(translateY, {
      toValue: 250, // Move the toast back below the screen
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      setShow(false); // Hide the toast after animation completes
      onClose(); // Call onClose callback after hiding
    });
  };

  return (
    show && (
      <Animated.View
        style={[
          styles.toastContainer,
          { backgroundColor: backgroundColor, transform: [{ translateY }] },
        ]}
      >
        <Image source={icon} style={styles.icon} />
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 150, // Start from the bottom
    left: "10%",
    right: "10%",
    zIndex: 999, // Ensure it's above other UI elements
    flexDirection: "row",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    maxWidth: "80%", // Ensure the toast does not take the full width of the screen
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  toastText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    flexWrap: "wrap", // Ensure the text wraps if it's too long
    flex: 1, // Allow the text to take available space
    overflow: "hidden", // Prevent overflow
  },
});

export default CustomToast;
