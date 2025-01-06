import { useToast } from "@/context/ToastContainer";
import { Link } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function BagTab() {
  const { showToast } = useToast();

  const showSomeToast = () => {     showToast("checking", "success", 2000);}

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>bag</Text>
      <TouchableOpacity onPress={showSomeToast}>
        <Text> press me</Text>
      </TouchableOpacity>
      <Link href={"/pages/static/about"}>Go to cart</Link>
    </View>
  );
}
