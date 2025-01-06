import { useToast } from "@/context/ToastContainer";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";


const VerifyOtp = ({  }) => {
  const { showToast } = useToast();
  const { colors } = useTheme();
//   const { email } = route.params;
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  // ---change positon of input as filled aur empty ---
  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const confirmOtp = async () => {
    if (otp.join("").length < 4) {
      showToast("Please enter a 4-digit OTP", "info", 2000); // Clear message
      return;
    }
    try {
      const otpValue = otp.join("");
    //   await verifyUserOtp(email, otpValue, setLoading, showToast, navigation); // Ensure order matches function definition
    } catch (err: any) {
      console.log("Error in confirmOtp:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity >
          <View style={styles.backButton}>
            {/* <Icon name="arrow-back" size={28} color="black" /> */}
          </View>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={{ display: "flex", flexDirection: "column", gap: 50 }}>
          {/* <CustomLoading size={250} /> */}
          <Text style={{ textAlign: "center", paddingTop: -40 }}>
            Checking verificatin code, Please Wait...{" "}
          </Text>
        </View>
      )}

      {!loading && <Text style={styles.title}>Verify Otp here</Text>}
      {!loading && (
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.otpInput,
                { borderColor: colors.text },
                { color: colors.text },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>
      )}
      {!loading && (
        <View>
          <TouchableOpacity onPress={confirmOtp}>
            {/* <CButton buttonText="Confirm" /> */}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 30,
  },
  backButton: {
    padding: 10,
    borderColor: "#DCDCDC",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    margin: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default VerifyOtp;
