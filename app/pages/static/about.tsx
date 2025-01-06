import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Headline,
  Headline2,
  NormalText,
  DescriptiveItems,
  DescriptionText,
} from "@/components/atoms/Text";

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Headline text="About Us" />
        <NormalText text="Lelekart, under the adept guidance of Kaushal Ranjeet Private Limited, is an Indian e-commerce pioneer committed to transforming fashion retail. We blend style, quality, and affordability, offering an array of clothing that speaks to your individuality." />
      </View>

      <View style={styles.section}>
        <Headline2 text="Why Shop with Us" />
        <View style={styles.paraContainer}>
          <DescriptiveItems text="Diverse Collection:" />
          <DescriptionText text="Explore a world of fashion with our handpicked selections, from everyday essentials to statement pieces." />
        </View>

        <View style={styles.paraContainer}>
          <DescriptiveItems text="Uncompromised Quality: " />
          <DescriptionText text="Every product is a testament to superior quality, ensuring satisfaction and durability." />
        </View>

        <View style={styles.paraContainer}>
          <DescriptiveItems text="Affordable Elegance: " />
          <DescriptionText text="Fashion is for everyone. Our competitive pricing makes style accessible to all." />
        </View>

        <View style={styles.paraContainer}>
          <DescriptiveItems text="Seamless Shopping: " />
          <DescriptionText text="Our intuitive website makes shopping a breeze, offering a streamlined browsing and purchasing process." />
        </View>

        <View style={styles.paraContainer}>
          <DescriptiveItems text="Customer-First Approach: " />
          <DescriptionText text="Your happiness is our mission. Our customer service team is always ready to assist with any queries or feedback." />
        </View>

        <View style={styles.paraContainer}>
          <DescriptiveItems text="Prompt Delivery: " />
          <DescriptionText text="Count on us for swift and dependable delivery throughout India." />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // backgroundColor: "#f9f9f9",
  },
  section: {
    marginBottom: 20,
  },
  paraContainer: {
    marginBottom: 10,
  },
});

export default AboutUs;
