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

const PrivacyPolicy = () => {
    const theme=useTheme()
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
          <Headline text="Privacy Policy" />
          <NormalText text="Last Updated on 15th March 2022" />
        </View>

        <View style={styles.section}>
          <NormalText text="This document shall be elucidated as a 'Privacy Policy' as required by the Indian Information Technology Act, 2000 and the rules promulgated thereunder. This Privacy Policy was last updated on 15th March 2022 (Kaushal and Ranjeet Private Limited) (We, our, or us) is devoted to the trust relationship we have with you — our customers. Since its inception, we are dedicated to creating authentic products by leading with our values. We will match leading-edge technology with your privacy interests as we continue to innovate our products." />
        </View>

        <View style={styles.section}>
          <Headline2 text="OUR PRIVACY PILLARS" />
          <NormalText text="1. Transparency: We want you to understand what and how we collect information when you interact with us via our website, mobile website, and application (www.lelekart.com) (hereinafter referred to as the 'Platform')." />
          <NormalText text="2. Choice: We will present you with options for how our trusted business partners and we may use your information." />
          <NormalText text="3. Data Integrity: In accordance with applicable law, we will take reasonable precautions to protect the information we collect about you through our platform by using secure technologies." />
        </View>

        <View style={styles.section}>
          <Headline2 text="DEFINITIONS OF TERMS USED IN PRIVACY POLICY" />
          <NormalText text="Browsing Information: We use cookies and web beacons to track the products you viewed and purchased online, the areas or pages you viewed on our platform, and other information related to your browser and browsing behaviour." />
          <NormalText text="Cookies: A 'cookie' is a text file that websites send to a visitor's computer or other Internet-connected device to uniquely identify the visitor's browser." />
          <NormalText text="Interest-Based Advertising: A 'cookie' is a text file that websites send to a visitor‘s computer or other Internet-connected device to uniquely identify the visitor’s browser." />
          <NormalText text="Personally Identifiable Information ('PII'): Personally identifiable information, or PII, is any information that either directly or indirectly identifies you." />
          <NormalText text="Third-Party Advertising Companies: Certain companies are allowed to collect information from our platform's browsers in order to serve interest-based ads." />
          <NormalText text="Web Beacons: Web beacons will be recognizing specific cookies that have been placed on your browser when you visit our platform." />
        </View>

        <View style={styles.section}>
          <Headline2 text="INFORMATION COLLECTED AND USED" />
          <NormalText text="We collect PII at various touch points, such as when you register with our platform, make a purchase on one of our platforms, or use any of our services in any other way." />
        </View>

        <View style={styles.section}>
          <Headline2 text="CHOICES REGARDING YOUR INFORMATION" />
          <NormalText text="You will be given the right to change or correct your information that you provide us in order to fulfill an order or sign up for an online offer or contest, along with the option not to receive marketing material from us when you provide us with PII." />
          <NormalText text="Feel free to write to us at any time to request to make amendments in certain PII that you believe are incorrect or irrelevant or to request that we block, erase, or otherwise remove your PII." />
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

export default PrivacyPolicy;
