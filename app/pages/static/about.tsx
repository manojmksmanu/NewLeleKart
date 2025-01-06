import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Headline, Headline2, NormalText } from "@/components/atoms/Text";
import { useTheme } from "@/context/ThemeContext";

const AboutUs = () => {
  const theme = useTheme()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container,{backgroundColor:theme.background}]} // Use contentContainerStyle for padding
        keyboardShouldPersistTaps="handled" // Allow tapping outside to dismiss keyboard
      >
        <View style={styles.section}>
          <Headline text="About Us" />
          <NormalText text="Lelekart, under the adept guidance of Kaushal Ranjeet Private Limited, is an Indian e-commerce pioneer committed to transforming fashion retail. We blend style, quality, and affordability, offering an array of clothing that speaks to your individuality." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Why Shop with Us" />
          <NormalText text="Diverse Collection: Explore a world of fashion with our handpicked selections, from everyday essentials to statement pieces." />
          <NormalText text="Uncompromised Quality: Every product is a testament to superior quality, ensuring satisfaction and durability." />
          <NormalText text="Affordable Elegance: Fashion is for everyone. Our competitive pricing makes style accessible to all." />
          <NormalText text="Seamless Shopping: Our intuitive website makes shopping a breeze, offering a streamlined browsing and purchasing process." />
          <NormalText text="Customer-First Approach: Your happiness is our mission. Our customer service team is always ready to assist with any queries or feedback." />
          <NormalText text="Prompt Delivery: Count on us for swift and dependable delivery throughout India." />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures the content can scroll
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
});

export default AboutUs;
