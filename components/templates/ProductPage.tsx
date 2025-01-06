import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { fetchProducts } from "../../api/medusa";

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      //   const productList = await fetchProducts();
      setProducts([]);
    };

    getProducts();
  }, []);

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity>
      <Text>Hello</Text>
      <View style={styles.productContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.variants[0].price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        ListEmptyComponent={<Text>No products available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
});

export default ProductPage;
