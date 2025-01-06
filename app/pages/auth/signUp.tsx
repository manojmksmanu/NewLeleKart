import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useToast } from "@/context/ToastContainer";
import { Headline, Subheads } from "@/components/atoms/Text";
import CustomInput from "@/components/atoms/Input";
import { Link } from "expo-router";
import { ButtonPrimaryBig } from "@/components/atoms/Button";
import { useTheme } from "@/context/ThemeContext";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegex = /^[0-9]{10}$/; // Regex for validating 10-digit phone numbers

const SignUp: React.FC = () => {
  const { showToast } = useToast();
  const theme = useTheme();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    // Name validation (minimum 4 characters)
    if (!name || name.length < 4) {
      showToast("Name must be at least 4 characters long", "info", 2000);
      return;
    }

    // Email validation
    if (!email) {
      showToast("Please fill email", "info", 2000);
      return;
    }
    if (!emailRegex.test(email)) {
      showToast("Please fill correct email", "info", 2000);
      return;
    }

    // Phone number validation (must be 10 digits)
    if (!phone || !phoneRegex.test(phone)) {
      showToast("Phone number must be 10 digits", "info", 2000);
      return;
    }

    // Password validation (minimum 8 characters)
    if (!password) {
      showToast("Please fill Password", "info", 2000);
      return;
    }
    if (password.length < 8) {
      showToast("Password must be at least 8 characters long", "info", 2000);
      return;
    }

    // Confirm password validation (must match password)
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "info", 2000);
      return;
    }

    // Proceed with the registration
    // await registerUser(
    //   email,
    //   name,
    //   phone,
    //   password,
    //   showToast,
    //   setLoading,
    //   navigation
    // );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          backgroundColor: theme.background,
          paddingBottom: 20, // Add padding to avoid keyboard overlap
        }}
        keyboardShouldPersistTaps="handled" // Allow tapping outside to dismiss keyboard
      >
        {/* Form Container */}
        {loading && (
          <View style={{ display: "flex", flexDirection: "column", gap: 50 }}>
            <Text style={{ textAlign: "center", paddingTop: -40 }}>
              Sending Verification Code, Please Wait...
            </Text>
          </View>
        )}
        {!loading && (
          <View style={styles.formContainer}>
            <View style={{ marginVertical: 25 }}>
              <Headline text="Sign Up" />
            </View>
            <View style={styles.inputWrapper}>
              <CustomInput
                value={name}
                setText={setName}
                placeholder="Enter Name"
              />
              <CustomInput
                value={email}
                setText={setEmail}
                placeholder="Enter Email"
              />
              <CustomInput
                value={phone}
                setText={setPhone}
                placeholder="Enter Phone No"
              />
              <CustomInput
                value={password}
                setText={setPassword}
                placeholder="Enter Password"
                secure={true}
              />
              <CustomInput
                value={confirmPassword}
                setText={setConfirmPassword}
                placeholder="Confirm Password"
                secure={true}
              />
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonPrimaryBig text="SignUp" onPress={handleSignUp} />
            </View>

            <View style={styles.bottomTextContainer}>
              <Subheads text="Have an account" />
              <Link href="/pages/auth/login">
                <Text style={[styles.signUpText, { color: "#1597FF" }]}>
                  Login Now
                </Text>
              </Link>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  bottomTextContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  noAccountText: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 16,
  },
  signUpText: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default SignUp;
