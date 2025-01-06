import { DescriptionText, Headline3 } from "@/components/atoms/Text";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "expo-router";

export default function ProfileTab() {
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* User Info Container */}
      <View style={{ height: 300, backgroundColor: "blue", width: "100%" }} />

      {/* Public Access Page Link */}

      <Link href="/pages/about">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="About us" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/about">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="About us" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/about">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="About us" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/about">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="About us" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/about">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="About us" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 18,
        }}
      >
        <DescriptionText text="Version 1.1 LeleKart" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    width: "100%",
  },
});
