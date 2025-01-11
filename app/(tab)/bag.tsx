import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useCartStore } from "@/store/cartStore";
import { Headline, Headline3, Subheads } from "@/components/atoms/Text";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonPrimaryBig } from "@/components/atoms/Button";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/context/ToastContainer";

const CartViewPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getTotalItems,
    // loading,
  } = useCartStore();
  const { width, height } = Dimensions.get("window");
  const [loading,setLoading]=useState(false)
  const theme = useTheme();
  const router = useRouter();
  const {token}=useAuthStore()
  const {showToast} = useToast()
console.log(loading)
  const navigateToCategory = (id: any) => {
    router.push(`/shop/productDetails?id=${id}`);
  };

  const handleUpdateQuantity = (
    product_id: number,
    variation_id: number | undefined,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(product_id, token, showToast);
    } else {
      updateQuantity(product_id,quantity, token, showToast);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={{ paddingLeft: 20, paddingVertical: 20 }}>
        <Headline text="My Bag" />
      </View>

      {/* Show loader if cart is loading */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : cart.length === 0 ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/images/online-shopping.png")}
          />
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) =>
              `${item.product_id}-${item.variation_id || "base"}`
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigateToCategory(item.product_id)}
                style={[
                  styles.cartItem,
                  { backgroundColor: theme.secondaryBackground },
                ]}
              >
                {/* Product Image */}
                <Image
                  source={{ uri: item?.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />

                {/* Product Details */}
                <View style={styles.itemDetails}>
                  <Subheads text={item?.name} />
                  <Subheads
                    text={`₹${(item?.price * item?.quantity).toFixed(2)}`}
                  />

                  {/* Variant Attributes */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {(item.attributes || []).map((attr, index) => (
                      <Text key={index} style={styles.attributeText}>
                        <Text style={styles.attributeName}>{attr.name}: </Text>
                        <Text style={styles.attributeOption}>
                          {attr.option}
                        </Text>
                      </Text>
                    ))}
                  </View>

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
                      <Text
                        style={[
                          styles.quantityButton,
                          {
                            backgroundColor: theme.background,
                            color: theme.text,
                          },
                        ]}
                      >
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text style={[styles.quantity, { color: theme.text }]}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleUpdateQuantity(
                          item.product_id,
                          item.variation_id,
                          item.quantity + 1
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.quantityButton,
                          {
                            backgroundColor: theme.background,
                            color: theme.text,
                          },
                        ]}
                      >
                        +
                      </Text>
                    </TouchableOpacity>

                    {/* Remove Button */}
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() =>
                        removeFromCart(item.product_id, item.variation_id)
                      }
                    >
                      <MaterialCommunityIcons
                        name="delete-circle-outline"
                        size={24}
                        color={theme.text}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* Subtotal and Checkout Section */}
          <View
            style={[
              styles.checkoutSection,
              { backgroundColor: theme.secondaryBackground },
            ]}
          >
            <View style={styles.subtotalContainer}>
              <Text style={{ color: theme.text, textAlign: "center" }}>
                <Headline3 text="SubTotal: " />
                <Text style={{ fontSize: 16, color: theme.text }}>
                  ₹{getSubtotal().toFixed(2)}
                </Text>
              </Text>
              <Text style={{ color: theme.text, textAlign: "center" }}>
                <Headline3 text="Total Items: " />
                <Text style={{ fontSize: 16, color: theme.text }}>
                  {getTotalItems()}
                </Text>
              </Text>
            </View>

            {/* Checkout Button */}
            <ButtonPrimaryBig text="Check Out" />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 10,
  },
  productImage: {
    width: "40%",
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginVertical: 10,
  },
  attributeText: {
    alignSelf: "flex-start",
    marginTop: 4,
    marginRight: 10,
  },
  attributeName: {
    color: "#888",
    fontSize: 12,
    fontWeight: "700",
  },
  attributeOption: {
    color: "#333",
    fontSize: 12,
    fontWeight: "700",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  checkoutSection: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  subtotalContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});

export default CartViewPage;
