import CustomInput from "@/components/atoms/Input";
import { useToast } from "@/context/ToastContainer";
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";


const ForgotPassword: React.FC = () => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const { colors } = useTheme();
  const { showToast } = useToast()
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Step states
  const [showOtp, setShowOtp] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // New state to track OTP sent status

  // ---Change position of input as filled or empty---
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

  const sendOtp = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "info", 2000);
      return;
    }
    // forgotPassword(email, setShowOtp, showToast, setLoading);
  };
  const confirmOtp = async () => {
    if (otp.join("").length < 4) {
      showToast("Please enter a 4-digit OTP", "info", 2000);
      return;
    }
    try {
    //   await verifyUserOtpForgot(email, otp.join(""), setLoading, showToast);
      const otpValue = otp.join("");
      console.log("OTP Confirmed:", otpValue);
      await setShowChangePassword(true);
      await showToast("OTP verified successfully!", "info", 2000);
    } catch (err: any) {
      console.log("Error in confirmOtp:", err);
      showToast("Invalid OTP. Please try again.", "error", 2000);
    }
  };
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error", 2000);
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters long", "error", 2000);
      return;
    }
    // await resetPassword(email, newPassword, showToast, setLoading);
    // await navigation.navigate("Login");
    // Handle further password change logic here
  };

  return (
    <View style={styles.container}>
       
      {/* Title */}
      <Text style={styles.contentText}>Forgot Password</Text>
      {/* Form Content */}
      {/* {loading && <CustomLoading size={250} />} */}
      {!loading && (
        <View style={styles.formContainer}>
          {/* Email Section */}
          {!otpSent && !showOtp && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Registered Email</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.text }]}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          )}

          {/* OTP Sent Message */}
          {/* {otpSent && !showOtp && (
          <Text style={styles.otpSentMessage}>OTP sent to your email!</Text>
        )} */}

          {!showOtp && !otpSent && (
            <TouchableOpacity style={styles.buttonWrapper} onPress={sendOtp}>
              
            </TouchableOpacity>
          )}

          {/* OTP Section */}
          {showOtp && !showChangePassword && (
            <>
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
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={confirmOtp}
              >
                {/* <CButton buttonText="Confirm OTP" /> */}
              </TouchableOpacity>
            </>
          )}

          {/* Change Password Section */}
          {showChangePassword && (
            <>
              <CustomInput
                value={newPassword}
                setText={setNewPassword}
                placeholder="Enter New Password"
                secure={true}
              />
              <CustomInput
                value={confirmPassword}
                setText={setConfirmPassword}
                placeholder="Enter Confirm Password"
                secure={true}
              />
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={changePassword}
              >
                {/* <CButton buttonText="Change Password" /> */}
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  contentText: {
    marginTop: 5,
    marginBottom: 50,
    fontSize: 18,
    paddingTop: 20,
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  otpSentMessage: {
    fontSize: 16,
    color: "#28a745", // Green color for success message
    marginBottom: 20,
    textAlign: "center",
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
  buttonWrapper: {
    width: "100%",
    marginTop: 20,
  },
});

export default ForgotPassword;
