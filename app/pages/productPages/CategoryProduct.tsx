import CustomHeader from "@/components/molecules/CustomHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams, router } from "expo-router";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";
import ProductCard from "@/components/organisms/productCard";

export default function CategoryProduct() {
  const { id } = useLocalSearchParams(); // Access query params
  const theme = useTheme();
  const { fetchProducts, productsByCategory } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjust for Android status bar
      }}
    >
      <View style={{}}>
        <CustomHeader title="Category Product" />
        <ScrollView contentContainerStyle={{paddingBottom:40}}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
           
          >
            {productsByCategory &&
              productsByCategory.map((product, index) => {
                return (
                  <View key={index} style={{ width: "50%", padding: 5 }}>
                    <ProductCard item={product} />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
