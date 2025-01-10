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
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import useProductStore from "@/store/productStore";
import { useEffect, useState } from "react";
import ProductCard from "@/components/organisms/productCard";
import { fetchProducts, getSubcategories } from "@/api/productApi";
import ContentLoader, { Rect } from "react-content-loader/native"; // Import Rect
import { HeaderSkeleton } from "@/components/molecules/loaders/HeaderSkeleton";
import { SubcategorySkeleton } from "@/components/molecules/loaders/SubcategorySkeleton";
import SkeletonLoading from "@/components/atoms/SkeletonLoading";
import { ProductSkeleton } from "@/components/molecules/loaders/ProductsSkeleton";

export default function CategoryProduct() {
  const { id } = useLocalSearchParams(); // Access query params
  const theme = useTheme();
  const [subCategories, setSubCategories] = useState<any>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]); // Initialize as an empty array
  const {
    fetchCategoryById,
    selectedCategory,
    storeLoading,
    setSelectedCategory,
  } = useProductStore();
console.log(loading,storeLoading)
  // Fetch subcategories
  const fetchSubcategories = async () => {
    const response = await getSubcategories(id);
    setSubCategories(response);
  };

  // Fetch products based on the selected category or subcategory
  const fetchProductsByCategory = async (categoryId: string | null) => {
    setLoading(true);
    try {
      const data = await fetchProducts({ category: categoryId || id });
      setProducts(data.products || []); // Ensure products is always an array
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]); // Set products to an empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset selectedSubCategory to null when the main category ID changes
    setSelectedSubCategory(null);
    setSelectedCategory(null); // Reset selectedCategory in the store
    fetchProductsByCategory(null); // Fetch products for the main category
    fetchCategoryById(id); // Fetch category details
    fetchSubcategories(); // Fetch subcategories
  }, [id]); // Dependency on `id` ensures this runs when the category changes

  useEffect(() => {
    // Fetch products when the selected subcategory changes
    fetchProductsByCategory(selectedSubCategory);
  }, [selectedSubCategory]);


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Header with Skeleton Loader */}
        {storeLoading ? (
          <HeaderSkeleton />
        ) : (
          <CustomHeader
            title={
              selectedCategory
                ? selectedCategory.name.length > 25
                  ? `${selectedCategory.name.slice(0, 25)}...`
                  : selectedCategory.name
                : ""
            }
          />
        )}

        {/* Horizontal Subcategory Selector with Skeleton Loader */}
        <View style={{ height: 32, marginVertical: 10 }}>
          {storeLoading ? (
            <SubcategorySkeleton/>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              <TouchableOpacity
                onPress={() => setSelectedSubCategory(null)} // "All" option
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  marginHorizontal: 5,
                  borderRadius: 20,
                  backgroundColor:
                    selectedSubCategory === null
                      ? theme.primary
                      : theme.secondaryBackground,
                }}
              >
                <Text
                  style={{
                    color: selectedSubCategory === null ? "white" : theme.text,
                    fontWeight: "500",
                  }}
                >
                  All
                </Text>
              </TouchableOpacity>

              {subCategories.map((subCategory: any) => (
                <TouchableOpacity
                  key={subCategory.id}
                  onPress={() => setSelectedSubCategory(subCategory.id)}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                    marginHorizontal: 5,
                    borderRadius: 20,
                    backgroundColor:
                      selectedSubCategory === subCategory.id
                        ? theme.primary
                        : theme.secondaryBackground,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedSubCategory === subCategory.id
                          ? "white"
                          : theme.text,
                      fontWeight: "500",
                    }}
                  >
                    {subCategory.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Loading Indicator */}
        {(loading  || storeLoading) &&  (
          <ProductSkeleton/>
         )} 

        {/* No Products Found */}
        {!loading && !storeLoading && products.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.text, fontSize: 16 }}>
              No products found.
            </Text>
          </View>
        )}

        {/* Product List */}
        {!loading && !storeLoading && products.length > 0 && (
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
                paddingHorizontal: 10,
              }}
            >
              {products.map((product, index) => {
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
        )}
      </View>
    </SafeAreaView>
  );
}
