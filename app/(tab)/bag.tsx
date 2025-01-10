// CartViewPage.tsx
import React from "react";
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
  
} from "react-native";
// Get screen width

import { useCartStore } from "@/store/cartStore";
import { Headline, Headline3, Subheads } from "@/components/atoms/Text";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonOutlinBig, ButtonPrimaryBig } from "@/components/atoms/Button";
import { useRouter } from "expo-router";

const CartViewPage = () => {
  const { cart, updateQuantity, removeFromCart, getSubtotal, getTotalItems } =
    useCartStore();
    const { width,height } = Dimensions.get("window"); 
  const theme = useTheme();
  const router = useRouter();
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
const navigateToCategory = (id: any) => {
    router.push(`/shop/productDetails?id=${id}`);
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
      {cart.length === 0 ? (
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1}}>
          <Image style={{width:200,height:200}} source={require("../../assets/images/online-shopping.png")}/>
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
              onPress={()=>{navigateToCategory(item.product_id)}}
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
                <View style={styles?.itemDetails}>
                  {/* Product Name */}
                  <Subheads text={item?.name} />
                  {/* Variant Attributes */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {(item.attributes || []).map((attr, index) => (
                      <Text
                        key={index}
                        style={{
                          alignSelf: "flex-start",
                          marginTop: 4,
                          marginRight: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: theme.primary,
                            opacity: 0.6,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {attr.name} :
                        </Text>
                        <Text
                          style={{
                            color: theme.text,
                            opacity: 0.9,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
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
                      {item?.quantity}
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
          <View
            style={{
              backgroundColor: theme.secondaryBackground,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              padding: 16, // Add padding for better spacing
              // Shadow for iOS
              shadowColor: theme.text, // Shadow color
              shadowOffset: { width: 0, height: -10 }, // Top shadow (negative height)
              shadowOpacity: 0.8, // Shadow opacity
              shadowRadius: 4, // Shadow blur radius
              // Shadow for Android
              elevation: 10, // Elevation for Android shadow
              display:'flex',
              alignItems:'center',
              gap:10
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap", // Allow wrapping on small screens
                alignItems: "center",
                justifyContent: "center", // Center content horizontally
                gap: 20, // Add gap between items
              }}
            >
              <Text style={{ color: theme.text, textAlign: "center" }}>
                <Headline3 text="SubTotal: " />
                <Text style={{ fontSize: 16, color: theme.text }}>
                  ₹ {getSubtotal().toFixed(2)}
                </Text>
              </Text>
              <Text style={{ color: theme.text, textAlign: "center" }}>
                <Headline3 text="Total Items: " />
                <Text style={{ fontSize: 16, color: theme.text }}>
                  {getTotalItems()}
                </Text>
              </Text>
            </View>
            <ButtonPrimaryBig text="Check Out"/>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
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
    // padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  productImage: {
    width: "40%",
    height: "100%",
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginVertical: 10,
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
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
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
