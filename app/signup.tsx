import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    emergencyContact: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      emergencyContact,
    } = formData;

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !emergencyContact
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (!acceptedTerms) {
      Alert.alert("Error", "Please accept the Terms & Conditions");
      return;
    }

    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Welcome to HERGuard!",
        "Your account has been created successfully. Your safety is our priority.",
        [
          {
            text: "Get Protected",
            onPress: () => router.replace("/(tabs)/home"),
          },
        ]
      );
    }, 2000);
  };

  const handleTermsPress = () => {
    Alert.alert(
      "Terms & Conditions",
      "By creating an account, you agree to our Privacy Policy and Terms of Service. Your data is encrypted and stored securely. Emergency features may share your location and audio data with trusted contacts when distress is detected.",
      [
        {
          text: "I Understand",
          onPress: () => setAcceptedTerms(true),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="shield-checkmark" size={40} color="#8A2BE2" />
            </View>
            <Text style={styles.title}>HERGuard</Text>
            <Text style={styles.subtitle}>Create Your Safety Account</Text>
          </View>
        </View>

        {/* Signup Form */}
        <View style={styles.formContainer}>
          <Text style={styles.signupTitle}>Join HERGuard</Text>
          <Text style={styles.signupSubtitle}>Your protection starts here</Text>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#8A2BE2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={formData.fullName}
              onChangeText={(text) => updateFormData("fullName", text)}
              autoCapitalize="words"
              autoComplete="name"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8A2BE2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email Address"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#8A2BE2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              value={formData.phone}
              onChangeText={(text) => updateFormData("phone", text)}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
          </View>

          {/* Emergency Contact */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="heart-outline"
              size={20}
              color="#8A2BE2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Emergency Contact Number"
              placeholderTextColor="#999"
              value={formData.emergencyContact}
              onChangeText={(text) => updateFormData("emergencyContact", text)}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#8A2BE2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={formData.password}
              onChangeText={(text) => updateFormData("password", text)}
              secureTextEntry={!showPassword}
              autoComplete="password-new"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#8A2BE2"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#8A2BE2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData("confirmPassword", text)}
              secureTextEntry={!showConfirmPassword}
              autoComplete="password-new"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#8A2BE2"
              />
            </TouchableOpacity>
          </View>

          {/* Terms & Conditions */}
          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}
            >
              {acceptedTerms && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink} onPress={handleTermsPress}>
                Terms & Conditions
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[
              styles.signupButton,
              isLoading && styles.signupButtonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.signupButtonText}>Creating Account...</Text>
            ) : (
              <Text style={styles.signupButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Security Commitment */}
        <View style={styles.securityCommitment}>
          <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
          <Text style={styles.commitmentTitle}>
            Your Safety, Our Commitment
          </Text>
          <Text style={styles.commitmentText}>
            We use end-to-end encryption and never share your data without your
            consent. Emergency features only activate when you need help.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E6E6FA",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 30,
  },
  signupTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4B0082",
    marginBottom: 8,
    textAlign: "center",
  },
  signupSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8FF",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E6E6FA",
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: "100%",
  },
  eyeIcon: {
    padding: 4,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#8A2BE2",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#8A2BE2",
    borderColor: "#8A2BE2",
  },
  termsText: {
    flex: 1,
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: "#8A2BE2",
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#8A2BE2",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#8A2BE2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#8A2BE2",
    fontSize: 14,
    fontWeight: "bold",
  },
  securityCommitment: {
    backgroundColor: "#F0F8FF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E6FA",
  },
  commitmentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B0082",
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  commitmentText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});
