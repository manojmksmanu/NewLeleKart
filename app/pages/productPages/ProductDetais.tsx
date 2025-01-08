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
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import RenderHtml from "react-native-render-html"; // For rendering HTML content

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
  const [loading, setLoading] = useState(true);

  // Fetch product and variations from the backend
  useEffect(() => {
    axios
      .get<{ product: Product; variations: Variation[] }>(
        `http://192.168.31.240:3000/products/${17380}`
      )
      .then((response) => {
        const { product, variations } = response.data;
        setProduct(product);
        setVariations(variations);

        // Pre-select the first variant (or any specific variant)
        if (variations.length > 0) {
          const preSelectedVariant = variations[0]; // Change this logic as needed
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
      // Filter the variations that match the selected attributes
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

      // Dynamically filter available options for each attribute
      const updatedAvailableOptions: { [key: string]: string[] } = {};
      product?.attributes.forEach((attribute) => {
        const validOptions = attribute.options.filter((option) => {
          // Check if this option is valid with the current selected attributes
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  // Get screen width using Dimensions API
  const { width } = Dimensions.get("window");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Images */}
      {product.images && product.images.length > 0 && (
        <Image
          source={{ uri: product.images[0].src }}
          style={styles.productImage}
          resizeMode="cover"
        />
      )}

      {/* Product Name */}
      <Text style={styles.productName}>{product.name}</Text>

      {/* Product Price */}
      <Text style={styles.productPrice}>${product.price}</Text>

      {/* Product Description */}
      {product.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: product.description }}
            tagsStyles={{
              p: { fontSize: 16, color: "#333", lineHeight: 24 },
            }}
          />
        </View>
      )}

      {/* Product Short Description */}
      {product.short_description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: product.short_description }}
            tagsStyles={{
              p: { fontSize: 16, color: "#666", lineHeight: 24 },
            }}
          />
        </View>
      )}

      {/* Product Categories */}
      {product.categories && product.categories.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {product.categories.map((category) => (
              <Text key={category.id} style={styles.category}>
                {category.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Product Tags */}
      {product.tags && product.tags.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {product.tags.map((tag) => (
              <Text key={tag.id} style={styles.tag}>
                {tag.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Product Attributes */}
      <Text style={styles.sectionTitle}>Attributes:</Text>
      {product?.attributes?.map(
        (attribute) =>
          attribute.variation && (
            <View key={attribute.id} style={styles.attributeContainer}>
              <Text style={styles.attributeName}>{attribute.name}</Text>
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
                        selectedAttributes[attribute.name] === option &&
                          styles.selectedOptionButton,
                        !isOptionAvailable && styles.disabledOptionButton,
                      ]}
                      disabled={!isOptionAvailable}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          !isOptionAvailable && styles.disabledOptionText,
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

      {/* Selected Variant ID */}
      <Text style={styles.selectedVariant}>
        Selected Variant ID: {selectedVariantId || "No variant selected"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e91e63",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: "lightblue",
  },
  disabledOptionButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
  disabledOptionText: {
    color: "#ccc",
  },
  selectedVariant: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default ProductPage;
