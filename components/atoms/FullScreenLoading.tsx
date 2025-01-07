import { useTheme } from "@/context/ThemeContext";
import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FullScreenLoading = () => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  const backgroundOpacity = animation.interpolate({
    inputRange: [0, 0.8],
    outputRange: [0.005, 0.3],
  });

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[styles.background, { opacity: backgroundOpacity }]}
      />
      <View
        style={[styles.loaderContainer, { backgroundColor: theme.primary }]}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    top: 0,
    zIndex: 1000,
  },
  background: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "#000",
  },
  loaderContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
});

export default FullScreenLoading;
