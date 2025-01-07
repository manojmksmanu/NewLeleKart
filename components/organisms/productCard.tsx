import { useTheme } from "@/context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import FastImage from "react-native-fast-image";
import { HelperText, NormalText, NormalText2, Subheads } from "../atoms/Text";
const ProductCard = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [heartScale] = useState(new Animated.Value(0));
  const [heartOpacity] = useState(new Animated.Value(0));
  const theme = useTheme();
  const item = {
    id: 1,
    name: "Product 1",
    price: 10.99,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "top",
    size: "x,l,ml,s",
  };

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    if (isWishlisted) {
      return null;
    } else {
      animateHeart();
    }
  };

  const animateHeart = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(heartScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <TouchableOpacity style={styles.productCard}>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          right: 0,
          top: 165,
        }}
      >
        <Pressable
          onPress={toggleWishlist}
          style={[
            styles.wishlistIconContainer,
            { backgroundColor: theme.background },
          ]}
        >
          <AntDesign
            name={isWishlisted ? "heart" : "hearto"}
            size={16}
            color={isWishlisted ? theme.primary : theme.text}
          />
          {/* <Icon
            name={isWishlisted ? "heart" : "heart-outline"}
            size={24}
            color={isWishlisted ? "red" : "grey"}
          /> */}
        </Pressable>
      </View>
      <FastImage
        source={{ uri: item?.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <HelperText text={item?.brand} />
        <Subheads text={item?.name} />
        <View style={styles.priceContainer}>
          <NormalText2 text={(item?.price).toString()} />
        </View>
        <View style={styles.detailsContainer}>
          <HelperText text={`size:${item.size}`} />
          {/* <View style={[styles.colorDot, { backgroundColor: item?.color }]} /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    margin: 4,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 184,
    borderRadius: 12,
  },
  productInfo: {
    padding: 8,
  },
  brandText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "line-through",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sizeText: {
    fontSize: 12,
    color: "#666",
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  wishlistIconContainer: {
    // marginRight: 12,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});

export default ProductCard;
