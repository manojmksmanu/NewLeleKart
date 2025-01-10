import {
  ButtonPrimaryBig,
  ButtonOutlinBig,
  ButtonOutlineSmall,
  ButtonPrimarySmall,
} from "@/components/atoms/Button";
import FullScreenLoading from "@/components/atoms/FullScreenLoading";
import SkeletonLoading from "@/components/atoms/SkeletonLoading";
import { Headline, HelperText } from "@/components/atoms/Text";
import ProductCard from "@/components/organisms/productCard";
import { useLoading } from "@/context/FullScreenLoaderContext";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function HomeTab() {
  const setLoading = useLoading();
  const theme = useTheme();

  

  const setsome = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View
      style={{ backgroundColor: theme.background }}
    >
      <HelperText text={"hello"} />
      <SkeletonLoading />

      <TouchableOpacity onPress={setsome}>
        <Text
          style={{ padding: 10, textAlign: "center", color: theme.text }}
        >
          Loading
        </Text>
      </TouchableOpacity>

      <Text style={{ padding: 10, fontSize: 18, textAlign: "center" }}>
        Welcome to the Home Tab!
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "50%", padding: 5 }}>
          <ProductCard />
        </View>
        <View style={{ width: "50%", padding: 5 }}>
          <ProductCard />
        </View>
        <View style={{ width: "50%", padding: 5 }}>
          <ProductCard />
        </View>
        <View style={{ width: "50%", padding: 5 }}>
          <ProductCard />
        </View>
      </View>
    </View>
  );
}
