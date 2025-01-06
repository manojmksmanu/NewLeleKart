import {
  ButtonPrimaryBig,
  ButtonOutlinBig,
  ButtonOutlineSmall,
  ButtonPrimarySmall,
} from "@/components/atoms/Button";
import { Headline, HelperText } from "@/components/atoms/Text";
import ProductPage from "@/components/templates/ProductPage";
import { View, Text } from "react-native";

export default function HomeTab() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ProductPage />
      <HelperText text={"hello"} />
      <Text>Welcome to the Home Tab!</Text>
    </View>
  );
}
