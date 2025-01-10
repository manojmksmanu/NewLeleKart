import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "@/components/atoms/Input";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "expo-router";
import { Headline, Subheads } from "@/components/atoms/Text";
import { ButtonPrimaryBig } from "@/components/atoms/Button";
import { useAuthStore } from "@/store/authStore"; // Import the Zustand store
import { useToast } from "@/context/ToastContainer"; // Import the toast context
import { CircularLoader } from "@/components/molecules/loaders/CircularLoadert";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const { login } = useAuthStore(); // Use Zustand store
  const { showToast } = useToast(); // Use toast context

  const handleLogin = async () => {
    if (!email) {
      showToast("Please fill email", "info", 2000);
      return; // Exit the function if email is invalid
    }
    if (!emailRegex.test(email)) {
      showToast("Please fill correct email", "info", 2000);
      return; // Exit the function if email is invalid
    }
    if (!password) {
      showToast("Please fill Password", "info", 2000);
      return; // Exit the function if password is invalid
    }

    setLoading(true); // Set loading state
    await login(email, password, showToast); // Call the login function with showToast
    setLoading(false); // Reset loading state
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Form Container */}
      {loading && <CircularLoader/>}
      {!loading && (
        <View style={styles.formContainer}>
          <View style={{ marginVertical: 45 }}>
            <Headline text="Login" />
          </View>

          <View style={styles.inputWrapper}>
            <CustomInput
              value={email}
              setText={setEmail}
              placeholder="Email"
            />
            <CustomInput
              value={password}
              setText={setPassword}
              placeholder="Password"
              secure={true}
            />
          </View>

          <View
            style={[
              styles.bottomTextContainer,
              { marginBottom: 10, marginTop: -10 },
            ]}
          >
            <Subheads text="Forgot your password?" />
            <Link href="/pages/auth/forgotPassword">
              <Text style={[styles.signUpText, { color: "#1597FF" }]}>
                Reset Now
              </Text>
            </Link>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ButtonPrimaryBig text="Login" onPress={handleLogin} />
          </View>

          <View style={styles.bottomTextContainer}>
            <Subheads text="Don't have an account?" />
            <Link href="/pages/auth/signUp">
              <Text style={[styles.signUpText, { color: "#1597FF" }]}>
                Register Now
              </Text>
            </Link>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Centers content horizontally
  },

  formContainer: {
    width: "90%",
  },

  inputWrapper: {
    width: "100%",
    marginBottom: 20,
  },

  orText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginVertical: 15,
  },
  googleButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: "#1A2421",
    width: "50%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
  bottomTextContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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

export default Login;
