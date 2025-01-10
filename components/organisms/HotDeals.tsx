import useHomeProductStore from "@/store/homeProductsStore";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import ProductCard from "./productCard";
import { CircularLoader } from "../molecules/loaders/CircularLoadert";
import { Headline, Headline2 } from "../atoms/Text";
import { ProductSkeleton } from "../molecules/loaders/ProductsSkeleton";

export default function HotDeals() {
  const { hotDealsProducts, fetchHotDealsProducts } = useHomeProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchHotDealsProducts();
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, [fetchHotDealsProducts]);

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
        <View style={{marginLeft:10}}>

        <Headline2 text={"Hot Deals"}/>
        </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {hotDealsProducts.map((product, index) => (
          <View key={index} style={{ width: "50%", padding: 5 }}>
            <ProductCard item={product} />
          </View>
        ))}
      </View>
    </View>
  );
}
