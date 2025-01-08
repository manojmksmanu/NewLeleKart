// CartViewPage.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useCartStore } from "@/store/cartStore";

const CartViewPage = () => {
  const { cart, updateQuantity, removeFromCart, getSubtotal, getTotalItems } =
    useCartStore();

  const handleUpdateQuantity = (
    product_id: number,
    variation_id: number | undefined,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(product_id, variation_id);
    } else {
      updateQuantity(product_id, variation_id, quantity);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) =>
              `${item.product_id}-${item.variation_id || "base"}`
            }
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {/* Product Image */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.itemDetails}>
                  {/* Product Name */}
                  <Text style={styles.itemName}>{item.name}</Text>
                  {/* Variant Attributes */}
                  {(item.attributes || []).map(
                    (
                      attr,
                      index // Fallback for undefined attributes
                    ) => (
                      <Text key={index} style={styles.attributeText}>
                        {attr.name}: {attr.option}
                      </Text>
                    )
                  )}
                  {/* Quantity Controls */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        handleUpdateQuantity(
                          item.product_id,
                          item.variation_id,
                          item.quantity - 1
                        )
                      }
                    >
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleUpdateQuantity(
                          item.product_id,
                          item.variation_id,
                          item.quantity + 1
                        )
                      }
                    >
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Remove Button */}
                  <TouchableOpacity
                    onPress={() =>
                      removeFromCart(item.product_id, item.variation_id)
                    }
                  >
                    <Text style={styles.removeButton}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Text style={styles.subtotal}>
            Subtotal: ${getSubtotal().toFixed(2)}
          </Text>
          <Text style={styles.totalItems}>Total Items: {getTotalItems()}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  attributeText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
  subtotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
  },
  totalItems: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "right",
  },
});

export default CartViewPage;
