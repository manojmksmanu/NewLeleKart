import CustomHeader from "@/components/molecules/CustomHeader";
import { useTheme } from "@/context/ThemeContext";
import { View, Text } from "react-native";

export default function CategoryProduct() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, marginTop: 50,backgroundColor:theme.background }}>
      <CustomHeader title="Category Product" />
      <Text>cart Profile Tab Screen</Text>
    </View>
  );
}
