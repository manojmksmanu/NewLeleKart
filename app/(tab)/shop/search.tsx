import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { fetchProducts } from "@/api/productApi";
import ProductCard from "@/components/organisms/productCard";
import ProductFilters from "@/components/templates/ProductFIlters";

export default function SearchProduct() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [SearchProduct, setSearchedProducts] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  const handleSearch = async () => {
    await setLoading(true);
    const data = await fetchProducts({ search: searchQuery });
    console.log("Search Query:", searchQuery);
    await setSearchedProducts(data.products);
    await setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);
  console.log(SearchProduct, "search product");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={[
          {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },

          { backgroundColor: theme.background },
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={theme.lightText}
              style={[
                styles.searchInput,
                {
                  backgroundColor: theme.secondaryBackground,
                  color: theme.text,
                },
              ]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch} // Trigger search on "Enter"
            />
          </View>

          {/* Search Icon */}
          <TouchableOpacity onPress={handleSearch}>
            <Feather name="search" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        {!loading && SearchProduct?.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: theme.text, fontSize: 18 }}>
              Product Not found
            </Text>
          </View>
        )}
        {loading && (
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
        )}

        {/* Content */}
        {!loading && (
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
              {SearchProduct &&
                SearchProduct.map((product: any, index: any) => {
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Elevation for Android
    zIndex: 100,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 0.5 }, // Shadow offset
    shadowOpacity: 0.05, // Shadow opacity
    shadowRadius: 20, // Shadow blur radius
    elevation: 1, // Elevation for Android
    borderRadius: 20, // Match the borderRadius of the input
  },
  searchInput: {
    width: "100%",
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    paddingLeft: 30,
    backgroundColor: "transparent", // Ensure the input background is transparent
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  filtersContainer: {
    flex: 1, // Allow filters to grow
  },
  filters: {
    backgroundColor: "#f5f5f5", // Custom background color
  },
  filtersContent: {
    padding: 8, // Custom padding
  },
});
