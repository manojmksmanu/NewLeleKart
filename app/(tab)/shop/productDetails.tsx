import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import CustomRenderHtml from "@/components/organisms/CustomRenderHtml";
import { useTheme } from "@/context/ThemeContext";
import ImageCarousel from "@/components/molecules/ImageCarouselProductDetails";
import { useToast } from "@/context/ToastContainer";
import { Ionicons } from "@expo/vector-icons";
import { CircularLoader } from "@/components/molecules/loaders/CircularLoadert";

// Define types for the product and variations
interface Attribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
  variation: boolean;
}

interface Variation {
  id: number;
  attributes: { name: string; option: string }[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: string;
  images: { id: number; src: string }[];
  attributes: Attribute[];
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

const ProductPage: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showToast } = useToast();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [availableOptions, setAvailableOptions] = useState<{
    [key: string]: string[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Zustand store for cart
  const { addToCart, isInCart } = useCartStore();

  // Use the theme
  const theme = useTheme();

  // Fetch product and variations from the backend
  useEffect(() => {
    setLoading(true);
    axios
      .get<{ product: Product; variations: Variation[] }>(
        `http://192.168.31.240:3000/products/${id}`
      )
      .then((response) => {
        const { product, variations } = response.data;
        setProduct(product);
        setVariations(variations);

        if (variations.length > 0) {
          const preSelectedVariant = variations[0];
          const initialAttributes: { [key: string]: string } = {};
          preSelectedVariant.attributes.forEach((attr) => {
            initialAttributes[attr.name] = attr.option;
          });
          setSelectedAttributes(initialAttributes);
          setSelectedVariantId(preSelectedVariant.id);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle attribute selection
  const handleAttributeChange = (attributeName: string, option: string) => {
    setSelectedAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attributeName]: option,
    }));
  };

  // Find matching variant based on selected attributes
  useEffect(() => {
    if (variations && variations.length > 0) {
      const matchingVariant = variations.find((variant) =>
        variant.attributes.every(
          (attr) =>
            selectedAttributes[attr.name] &&
            selectedAttributes[attr.name] === attr.option
        )
      );

      if (matchingVariant) {
        setSelectedVariantId(matchingVariant.id);
      } else {
        setSelectedVariantId(null);
      }

      const updatedAvailableOptions: { [key: string]: string[] } = {};
      product?.attributes.forEach((attribute) => {
        const validOptions = attribute.options.filter((option) => {
          return variations.some((variant) =>
            variant.attributes.every((attr) => {
              if (attr.name === attribute.name) {
                return attr.option === option;
              } else if (selectedAttributes[attr.name]) {
                return attr.option === selectedAttributes[attr.name];
              }
              return true;
            })
          );
        });
        updatedAvailableOptions[attribute.name] = validOptions;
      });

      setAvailableOptions(updatedAvailableOptions);
    }
  }, [selectedAttributes, variations, product]);

  const navigateToBag = () => {
    router.push(`/bag`);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!product) return;
    const item = {
      product_id: product.id,
      variation_id: selectedVariantId || undefined,
      quantity: quantity,
      image: product.images[0]?.src || "",
      name: product.name,
      attributes:
        variations.find((v) => v.id === selectedVariantId)?.attributes || [],
    };
    if (!isSelectedVariantInCart) {
      addToCart(item); // Add the item to the cart
      showToast("Product Added to Bag, Check Your Bag", "success", 2000); // Show toast message
    }
    if (isSelectedVariantInCart) {
      navigateToBag();
    }
  };

  // Check if the selected variant is in the cart
  const isSelectedVariantInCart = isInCart(
    product?.id || 0,
    selectedVariantId || undefined
  );

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <CircularLoader />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <Text style={{ color: theme.text }}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  // Get screen width using Dimensions API
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        { backgroundColor: theme.background },
        // {
        //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // },
      ]}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: theme.primary,
          width: 70,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          opacity: 0.9,
          zIndex: 100,
          position: "absolute",
          left: 10,
          top: 50,
        }}
      >
        <Ionicons
          name="arrow-back-sharp"
          style={{ textAlign: "center" }}
          size={30}
          color={"white"}
        />
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
      >
        {/* Product Images */}
        {product.images && product.images.length > 0 && (
          <ImageCarousel images={product.images} />
        )}

        {/* Product Name */}
        <Text style={[styles.productName, { color: theme.text }]}>
          {product.name}
        </Text>

        {/* Product Price */}
        <Text style={[styles.productPrice, { color: theme.primary }]}>
          ${product.price}
        </Text>

        {/* Product Attributes */}
        {product?.attributes?.map(
          (attribute) =>
            attribute.variation && (
              <View key={attribute.id} style={styles.attributeContainer}>
                <Text style={[styles.attributeName, { color: theme.text }]}>
                  {attribute.name}
                </Text>
                <View style={styles.optionsContainer}>
                  {attribute.options?.map((option) => {
                    const isOptionAvailable =
                      availableOptions[attribute.name]?.includes(option);
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() =>
                          handleAttributeChange(attribute.name, option)
                        }
                        style={[
                          styles.optionButton,
                          {
                            backgroundColor: theme.secondaryBackground,
                            borderWidth: 2,
                            borderColor: theme.background,
                          },
                          selectedAttributes[attribute.name] === option && {
                            backgroundColor: theme.primary,
                            borderWidth: 2,
                            // borderColor: theme.lightText,
                          },
                          !isOptionAvailable && {
                            opacity: 0.3,
                            backgroundColor: theme.secondaryBackground,
                          },
                        ]}
                        disabled={!isOptionAvailable}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            { color: theme.text }, // Default text color
                            selectedAttributes[attribute.name] === option && {
                              color: theme.buttonText, // Text color for selected option
                            },
                            !isOptionAvailable && {
                              color: theme.lightText, // Text color for unavailable options
                            },
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )
        )}

        {/* Quantity Selector and Add to Cart Button */}
        <View style={styles.addToCartContainer}>
          {/* Quantity Selector */}
          {!isSelectedVariantInCart && (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                style={[
                  styles.quantityButton,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Text
                  style={[
                    styles.quantityButtonText,
                    { color: theme.buttonText },
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={[styles.quantityText, { color: theme.text }]}>
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={[
                  styles.quantityButton,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Text
                  style={[
                    styles.quantityButtonText,
                    { color: theme.buttonText },
                  ]}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            style={[
              styles.addToCartButton,
              {
                backgroundColor: theme.primary,
                width: isSelectedVariantInCart ? "100%" : "auto",
              },
            ]}
          >
            <Text style={[styles.addToCartText, { color: theme.buttonText }]}>
              {isSelectedVariantInCart ? "In Your Bag" : "ADD TO CART"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product Categories */}
        {product.categories && product.categories.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Categories
            </Text>
            <View style={styles.categoriesContainer}>
              {product.categories.map((category) => (
                <Text
                  key={category.id}
                  style={[
                    styles.category,
                    {
                      backgroundColor: theme.secondaryBackground,
                      color: theme.text,
                    },
                  ]}
                >
                  {category.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Product Tags */}
        {product.tags && product.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Tags
            </Text>
            <View style={styles.tagsContainer}>
              {product.tags.map((tag) => (
                <Text
                  key={tag.id}
                  style={[
                    styles.tag,
                    {
                      backgroundColor: theme.secondaryBackground,
                      color: theme.text,
                    },
                  ]}
                >
                  {tag.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Product Description */}
        {product.description && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Description
            </Text>
            <CustomRenderHtml
              contentWidth={width}
              source={{ html: product.description }}
              baseStyle={{
                color: theme.text,
                fontSize: 16,
                lineHeight: 24,
              }}
              tagsStyles={{
                p: { color: theme.text, fontSize: 16, lineHeight: 24 },
                h1: { color: theme.text, fontSize: 24, fontWeight: "bold" },
                h2: { color: theme.text, fontSize: 22, fontWeight: "bold" },
                h3: { color: theme.text, fontSize: 20, fontWeight: "bold" },
                h4: { color: theme.text, fontSize: 18, fontWeight: "bold" },
                h5: { color: theme.text, fontSize: 16, fontWeight: "bold" },
                h6: { color: theme.text, fontSize: 14, fontWeight: "bold" },
                span: { color: theme.text },
                strong: { color: theme.text, fontWeight: "bold" },
                em: { color: theme.text, fontStyle: "italic" },
                a: { color: theme.primary, textDecorationLine: "underline" },
                li: { color: theme.text },
                ul: { color: theme.text },
                ol: { color: theme.text },
                blockquote: { color: theme.text, fontStyle: "italic" },
              }}
              enableCSSInlineProcessing={true}
            />
          </View>
        )}

        {/* Product Short Description */}
        {product.short_description && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Overview
            </Text>
            <CustomRenderHtml
              contentWidth={width}
              source={{ html: product.short_description }}
              baseStyle={{
                color: theme.text,
                fontSize: 16,
                lineHeight: 24,
              }}
              tagsStyles={{
                p: { color: theme.text, fontSize: 16, lineHeight: 24 },
                h1: { color: theme.text, fontSize: 24, fontWeight: "bold" },
                h2: { color: theme.text, fontSize: 22, fontWeight: "bold" },
                h3: { color: theme.text, fontSize: 20, fontWeight: "bold" },
                h4: { color: theme.text, fontSize: 18, fontWeight: "bold" },
                h5: { color: theme.text, fontSize: 16, fontWeight: "bold" },
                h6: { color: theme.text, fontSize: 14, fontWeight: "bold" },
                span: { color: theme.text },
                strong: { color: theme.text, fontWeight: "bold" },
                em: { color: theme.text, fontStyle: "italic" },
                a: { color: theme.primary, textDecorationLine: "underline" },
                li: { color: theme.text },
                ul: { color: theme.text },
                ol: { color: theme.text },
                blockquote: { color: theme.text, fontStyle: "italic" },
              }}
              enableCSSInlineProcessing={true}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  category: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  attributeContainer: {
    marginBottom: 20,
  },
  attributeName: {
    fontSize: 18,
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 5,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
    // Shadow for Android
    elevation: 2, // Elevation for Android
  },
  optionText: {
    fontSize: 12,
  },
  addToCartContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 20,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  addToCartButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    flex: 1,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ProductPage;
