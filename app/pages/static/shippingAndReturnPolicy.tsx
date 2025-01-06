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

const ShippingAndReturnPolicy = () => {
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
          <Headline text="Delivery Charges on Lelekart" />
          <NormalText text="Delivery charges depend on the seller and the order value." />
          <NormalText text="For Lelekart items:" />
          <NormalText text="Orders below Rs 500: Rs 40 per item delivery charge." />
          <NormalText text="Orders Rs 500 and above: Free delivery." />
          <NormalText text="For seller-listed items, refer to the order summary for individual product delivery charges." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Estimated Delivery Time" />
          <NormalText text="Estimated delivery time depends on several factors:" />
          <NormalText text="• Seller offering the product" />
          <NormalText text="• Product availability" />
          <NormalText text="• Your shipping destination" />
          <NormalText text="• Seller location" />
          <NormalText text="• Courier partner's delivery time in your area" />
          <NormalText text="Business days exclude Sundays and public holidays. Check the product page for the estimated delivery time. Entering your pin code can provide a more accurate estimate." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Why the Estimated Delivery Time Varies" />
          <NormalText text="Delivery times are influenced by product availability, geographic location of the Seller, your shipping destination, and the courier partner's time-to-deliver in your location." />
          <NormalText text="Please enter your default pin code on the product page to know more accurate delivery times." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Why Might the Delivery Date Differ?" />
          <NormalText text="There are a few reasons why the delivery date might not exactly match the advertised timeline:" />
          <NormalText text="• Holidays: Delivery may shift if a holiday falls between order placement and expected delivery." />
          <NormalText text="• Weekends: Some sellers or courier partners don't operate on Sundays." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Are There Hidden Costs?" />
          <NormalText text="No, there are NO hidden charges on Lelekart. The listed price on the product page is the final price you'll pay, which includes all applicable taxes." />
          <NormalText text="Delivery charges may apply depending on the seller's policy." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Seller Does Not Ship to My Area" />
          <NormalText text="If the seller does not ship to your area, it could be due to several factors, including legal restrictions or unavailable reliable courier partners." />
          <NormalText text="You can check whether a product can be delivered to your location by entering your pincode on the product page." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Why is CoD Not Available in My Area?" />
          <NormalText text="Availability of CoD depends on the courier partner's ability to accept cash at the time of delivery." />
          <NormalText text="Enter your pincode on the product page to check if CoD is available in your location." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Product Tag Explained" />
          <NormalText text="• In Stock: Available for immediate shipping." />
          <NormalText text="• Available: Can be procured by the seller upon order placement." />
          <NormalText text="• Preorder or Forthcoming: Expected to be released soon, available for pre-booking." />
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

export default ShippingAndReturnPolicy;
