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

const RefundAndCancellationPolicy = () => {
  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.background },
        ]} // Use contentContainerStyle for padding
        keyboardShouldPersistTaps="handled" // Allow tapping outside to dismiss keyboard
      >
        <View style={styles.section}>
          <Headline text="Refund/Cancellation Policy" />
          <NormalText text="At Lelekart, we are committed to providing our customers with the highest level of satisfaction. If for any reason you are not satisfied with your purchase, we offer the following Refund/Cancellation Policy." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Refunds" />
          <NormalText text="If you are not satisfied with your purchase, you may request a full refund within 7 days of the purchase date. To request a refund, please contact us at +91 9877454036. Refunds will be processed within 7 days of receipt of the request. The total amount will be credited within 5-7 working days to the customer's account." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Cancellations" />
          <NormalText text="If you need to cancel your order, please contact us as soon as possible at +91 9877454036. If your order has not yet been processed, we will cancel the order and issue a full refund. If your order has been processed, we may not be able to cancel it, but you may be eligible for a refund under our Refunds policy." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Changes to this Policy" />
          <NormalText text="We may update this Refund/Cancellation Policy from time to time to reflect changes in our practices or to comply with legal requirements. We will notify you of any material changes to this Policy by posting the updated policy on our website. Your continued use of our services after the effective date of any changes to this Policy constitutes your acceptance of the changes." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Exceptions" />
          <NormalText text="This Refund/Cancellation Policy does not apply to certain products or services, such as digital products or services delivered electronically. For these products and services, all sales are final and no refunds will be issued." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Contact Information" />
          <NormalText text="If you have any questions about this Refund/Cancellation Policy or our information practices, please contact us at +91 9877454036." />
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

export default RefundAndCancellationPolicy;
