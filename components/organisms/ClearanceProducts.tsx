import useHomeProductStore from "@/store/homeProductsStore";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import ProductCard from "./productCard";
import { Headline2 } from "../atoms/Text";
import { ProductSkeleton } from "../molecules/loaders/ProductsSkeleton";

export default function ClearanceProducts() {
  const { fetchClearanceProducts, clearanceProducts } = useHomeProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchClearanceProducts();
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, [clearanceProducts]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ProductSkeleton/>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{ marginLeft: 10 }}>
        <Headline2 text={"Clearance Products"} />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {clearanceProducts.map((product, index) => (
          <View key={index} style={{ width: "50%", padding: 5 }}>
            <ProductCard item={product} />
          </View>
        ))}
      </View>
    </View>
  );
}
