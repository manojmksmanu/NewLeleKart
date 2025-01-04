import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function BagTab() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>bag</Text>
      <Link href={"/cart"}>Go to cart</Link>
    </View>
  );
}
