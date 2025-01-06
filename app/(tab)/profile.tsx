import { DescriptionText, Headline3 } from "@/components/atoms/Text";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "expo-router";
import { ButtonPrimaryBigLink } from "@/components/atoms/Button";

export default function ProfileTab() {
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      {/* User Info Container */}
      <View
        style={{
          height: 200,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              backgroundColor: theme.secondary,
              borderRadius: 100,
            }}
            source={require("../../assets/images/boy.png")}
          />
          <Link href="/pages/auth/login">
            <View
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 40,
              }}
            >
              <ButtonPrimaryBigLink text="Login/SignUp" />
            </View>
          </Link>
        </View>
      </View>

      {/* Public Access Page Links */}
      <Link href="/pages/static/about">
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
      <Link href="/pages/static/paymentInfo">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="Payment Information" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/static/privacyPolicy">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="Privacy Policy" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/static/refundAndCancellationPolicy">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="Refund and cancellation" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/static/safeAndSecure">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="Safe and secure" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>
      <Link href="/pages/static/shippingAndReturnPolicy">
        <View
          style={[
            styles.linkContainer,
            {
              borderColor: theme.lightText,
            },
          ]}
        >
          <Headline3 text="Shipping and returns" />
          <AntDesign name="right" size={18} color={theme.text} />
        </View>
      </Link>

      {/* Version Info */}
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
