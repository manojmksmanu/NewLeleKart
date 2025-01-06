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

const PaymentInfoPage = () => {
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
          <Headline text="Payment Information" />
        </View>

        <View style={styles.section}>
          <Headline2 text="How do I pay for a LeleKart purchase?" />
          <NormalText text="LeleKart offers you multiple payment methods. Whatever your online mode of payment, you can rest assured that LeleKart's trusted payment gateway partners use secure encryption technology to keep your transaction details confidential at all times. You may use Internet Banking, Gift Card, Cash on Delivery, and Wallet to make your purchase. LeleKart also accepts payments made using Visa, MasterCard, Maestro, and American Express credit/debit cards in India and 21 other countries." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Are there any hidden charges (Octroi or Sales Tax)?" />
          <NormalText text="There are NO hidden charges when you make a purchase on Lelekart. The prices listed for all items are final and all-inclusive. The price you see on the product page is exactly what you pay. Delivery charges may be extra depending on the seller's policy. Please check the individual seller for the same. In the case of seller WS Retail, the ₹50 delivery charge is waived off on orders worth ₹500 and over." />
        </View>

        <View style={styles.section}>
          <Headline2 text="What is Cash on Delivery?" />
          <NormalText text="If you are not comfortable making an online payment on lelekart.com, you can opt for the Cash on Delivery (C-o-D) payment method instead. With C-o-D, you can pay in cash at the time of the actual delivery of the product at your doorstep, without requiring you to make any advance payment online. The maximum order value for a Cash on Delivery (C-o-D) payment is ₹50,000. It is strictly a cash-only payment method. Gift Cards or store credit cannot be used for C-o-D orders. Foreign currency cannot be used to make a C-o-D payment. Only Indian Rupees accepted." />
        </View>

        <View style={styles.section}>
          <Headline2 text="How do I pay using a credit/debit card?" />
          <NormalText text="We accept payments made by credit/debit cards issued in India and 21 other countries. Credit cards: Visa, MasterCard, and American Express are accepted. Debit cards: Visa, MasterCard, and Maestro are accepted." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Is it safe to use my credit/debit card on Lelekart?" />
          <NormalText text="Your online transaction on Lelekart is secure with 256-bit encryption technology to protect your card information. Lelekart uses trusted payment gateways managed by leading banks. Banks also use 3D Secure password for additional security." />
        </View>

        <View style={styles.section}>
          <Headline2 text="What steps does Lelekart take to prevent card fraud?" />
          <NormalText text="Lelekart and their partners monitor transactions for suspicious activity. They may request identity documents in rare cases to verify the cardholder." />
        </View>

        <View style={styles.section}>
          <Headline2 text="What is a 3D Secure password?" />
          <NormalText text="The 3D Secure password is an additional layer of security for online credit/debit card transactions. It is created by you and known only to you." />
        </View>

        <View style={styles.section}>
          <Headline2 text="Can I make a credit/debit card or Internet Banking payment on Lelekart through my mobile?" />
          <NormalText text="Yes, you can make credit card payments through the Lelekart mobile site and application. Lelekart uses secure encryption technology to protect your card information." />
        </View>

        <View style={styles.section}>
          <Headline2 text="How do I place a Cash on Delivery (C-o-D) order?" />
          <NormalText text="Look for the 'Cash on Delivery Available' icon on the item. Add the item to your cart and proceed to checkout. Choose 'Pay By Cash on Delivery' and enter the CAPTCHA text. Once verified, your order will be processed for shipment." />
          <NormalText text="Maximum order value for C-o-D is ₹50,000. Only cash is accepted at the time of delivery." />
        </View>

        <View style={styles.section}>
          <Headline2 text="What is Lelekart's credit card EMI option?" />
          <NormalText text="Lelekart's credit card EMI option allows you to pay for your purchases in installments of 3, 6, 9, 12, 18*, or 24 months* with credit cards from select banks (HDFC, Citi, ICICI, etc.). There is no processing fee, but the bank may charge interest. Be sure to check with your bank for details on how cancellations, refunds, or pre-closure could affect your EMI terms and interest charges." />
        </View>

        <View style={styles.section}>
          <Headline2 text="How do I make a payment using Lelekart's credit card EMI option?" />
          <NormalText text="1. Add your desired items to your Lelekart shopping cart. 2. Proceed with your order and enter your address. 3. When choosing a payment method, select 'EMI'. 4. Choose your credit card issuing bank and select your preferred EMI plan. 5. Enter your credit card details and click 'Save and Pay'. Please note: The full amount will be charged to your card on the day of the transaction." />
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

export default PaymentInfoPage;
