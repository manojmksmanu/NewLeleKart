import SkeletonLoading from "@/components/atoms/SkeletonLoading";
import { useTheme } from "@/context/ThemeContext";
import useProductStore from "@/store/categoryStore";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import CustomHeader from "@/components/molecules/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import { CircularLoader } from "@/components/molecules/loaders/CircularLoadert";
import useCategoryStore from "@/store/categoryStore";
import { fetchCategories, fetchCategoryById } from "@/api/categoriesApi";

export default function ShopTab() {
  const router = useRouter();
  const {
    categories,
    selectedCategory,
    storeLoading,
    setCategories,
    setSelectedCategory,
    setStoreLoading,
  } = useCategoryStore();
  const theme = useTheme();
  const [page,setPage]=useState<any>(1)
  // Fetch all categories
  const loadCategories = async () => {
    setStoreLoading(true);
    try {
      const data = await fetchCategories( );
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setStoreLoading(false);
    }
  };
  console.log(storeLoading, "storeloading");
  // Fetch a category by ID
  const loadCategoryById = async (id: number) => {
    setStoreLoading(true);
    try {
      const data = await fetchCategoryById(id);
      setSelectedCategory(data);
    } catch (error) {
      console.error("Error loading category:", error);
    } finally {
      setStoreLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [page]);

  const navigateToCategory = (id: any) => {
    // Passing parameters via the URL
    router.push(`/shop/categoriesProducts?id=${id}`);
  };

  if (storeLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <CircularLoader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <CustomHeader title="All Categories" />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 0 }} // Add padding at the bottom
      >
        <View style={styles.categoriesContainer}>
          {categories && categories.length > 0 ? (
            categories.map((category, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.categoryCard,
                  { backgroundColor: theme.secondaryBackground },
                ]}
                onPress={() => navigateToCategory(category.id)}
              >
                <Text style={[styles.categoryName, { color: theme.text }]}>
                  {category.name}
                </Text>
                {category?.image ? (
                  <Image
                    source={{ uri: category?.image?.src }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require("../../../assets/images/categories.png")}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCategoriesText}>
              No categories available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 10,
  },
  categoryCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 20,
    width: "40%",
  },
  categoryImage: {
    width: "50%",
    height: 100,
    borderRadius: 10,
  },
  noCategoriesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});
