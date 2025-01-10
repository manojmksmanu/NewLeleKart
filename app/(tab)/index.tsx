import {
  ButtonPrimaryBig,
  ButtonOutlinBig,
  ButtonOutlineSmall,
  ButtonPrimarySmall,
} from "@/components/atoms/Button";
import FullScreenLoading from "@/components/atoms/FullScreenLoading";
import SkeletonLoading from "@/components/atoms/SkeletonLoading";
import { Headline, HelperText } from "@/components/atoms/Text";
import HotDeals from "@/components/organisms/HotDeals";
import ProductCard from "@/components/organisms/productCard";
import { useLoading } from "@/context/FullScreenLoaderContext";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";
import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import ClearanceProducts from "@/components/organisms/ClearanceProducts";
import BestProducts from "@/components/organisms/BestProducts";
import useHomeProductStore from "@/store/homeProductsStore";

export default function HomeTab() {
  const theme = useTheme();


  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.background,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <HotDeals />
        <BestProducts />
        <ClearanceProducts />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 16,
    // paddingHorizontal: 16,
  },
  section: {
    // marginBottom: 24,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
