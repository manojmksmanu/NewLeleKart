import SkeletonLoading from "@/components/atoms/SkeletonLoading";
import { useTheme } from "@/context/ThemeContext";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Category } from "@/types";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import TabsHeader from "@/components/molecules/TabsHeader";
import CustomHeader from "@/components/molecules/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView

export default function ShopTab() {
  const router = useRouter();
  const { fetchCategories, categories, storeLoading } = useProductStore();
  const theme = useTheme();

  useEffect(() => {
    fetchCategories();
  }, []);

  const navigateToCategory = (id: any) => {
    // Passing parameters via the URL
    router.push(`/shop/categoriesProducts?id=${id}`);
  };

  if (storeLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
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
