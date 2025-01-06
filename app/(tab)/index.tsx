import {
  ButtonPrimaryBig,
  ButtonOutlinBig,
  ButtonOutlineSmall,
  ButtonPrimarySmall,
} from "@/components/atoms/Button";
import { Headline, HelperText } from "@/components/atoms/Text";
import { View, Text } from "react-native";

export default function HomeTab() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
    
      <HelperText text={"hello"} />
      <Text>Welcome to the Home Tab!</Text>
    </View>
  );
}
