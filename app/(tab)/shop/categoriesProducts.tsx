import CustomHeader from "@/components/molecules/CustomHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";
import ProductCard from "@/components/organisms/productCard";
import SkeletonLoading from "@/components/atoms/SkeletonLoading";

export default function CategoryProduct() {
  const { id } = useLocalSearchParams(); // Access query params
  const theme = useTheme();
  const {
    fetchProducts,
    productsByCategory,
    storeLoading,
    fetchCategoryById,
    selectedCategory,
  } = useProductStore();

  useEffect(() => {
    fetchProducts({ category: id });
    fetchCategoryById(id);
  }, [id]);

  if (storeLoading) {
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
          { backgroundColor: theme.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.text} />
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={{}}>
        <CustomHeader
          title={
            selectedCategory
              ? selectedCategory.name.length > 25
                ? `${selectedCategory.name.slice(0, 25)}...`
                : selectedCategory.name
              : ""
          }
        />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
            backgroundColor: theme.background,
          }}
        >
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
                if (product?.images?.length === 0) {
                  return null;
                }
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
