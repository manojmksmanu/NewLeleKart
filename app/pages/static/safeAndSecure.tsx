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

const SafeAndSecureShopping = () => {
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
          <Headline text="Safe and Secure Shopping" />
          <NormalText text="Lelekart is dedicated to ensuring a safe and secure shopping experience for our customers. Here are some frequently asked questions regarding the security of online payments on Lelekart:" />
        </View>

        <View style={styles.section}>
          <Headline2 text="Is making online payment secure on Lelekart?" />
          <NormalText text="Yes, making the online payment is secure on Lelekart." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Does Lelekart store my credit/debit card information?" />
          <NormalText text="No. Lelekart only stores the last 4 digits of your card number for the purpose of card identification." />
        </View>

        <View style={styles.section}>
          <Headline2 text="What credit/debit cards are accepted on Lelekart?" />
          <NormalText text="We accept VISA, MasterCard, Maestro, Rupay, American Express, Diner's Club, and Discover credit/debit cards." />
        </View>

        <View style={styles.section}>
          <Headline2 text="What other payment options are available on Lelekart?" />
          <NormalText text="Apart from Credit and Debit Cards, we accept payments via Internet Banking (covering 44 banks), Cash on Delivery, Equated Monthly Installments (EMI), E-Gift Vouchers, Lelekart Pay Later, UPI, Wallet, and Paytm Postpaid." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Do you accept payment made by credit/debit cards issued in other countries?" />
          <NormalText text="Yes! We accept VISA, MasterCard, Maestro, American Express credit/debit cards issued by banks in India and in the following countries: Australia, Austria, Belgium, Canada, Cyprus, Denmark, Finland, France, Germany, Ireland, Italy, Luxembourg, the Netherlands, New Zealand, Norway, Portugal, Singapore, Spain, Sweden, the UK, and the US. Please note that we do not accept internationally issued credit/debit cards for eGV payments/top-ups." />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures the content can scroll
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  section: {
    marginBottom: 20,
  },
});

export default SafeAndSecureShopping;
