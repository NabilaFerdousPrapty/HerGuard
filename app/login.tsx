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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // For prototype, just navigate to main app
      router.replace("/(tabs)/home");
    }, 1500);
  };

  const handleEmergencyAccess = () => {
    Alert.alert(
      "Emergency Access",
      "This will immediately activate emergency monitoring without login. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Activate",
          style: "destructive",
          onPress: () => router.replace("/(tabs)/home"),
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
            <Text style={styles.subtitle}>Your AI Safety Companion</Text>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>Welcome Back</Text>
          <Text style={styles.loginSubtitle}>
            Sign in to continue your protection
          </Text>

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
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
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
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
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

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.loginButtonText}>Signing In...</Text>
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Emergency Access */}
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={handleEmergencyAccess}
          >
            <Ionicons name="warning-outline" size={20} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>
              Emergency Quick Access
            </Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Security Features */}
        <View style={styles.securityFeatures}>
          <Text style={styles.securityTitle}>Your Safety Features:</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>End-to-End Encryption</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="location-outline" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>
                Real-time Location Tracking
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="mic-outline" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>AI Audio Monitoring</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="lock-closed" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>Privacy First Design</Text>
            </View>
          </View>
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
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
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
  loginTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4B0082",
    marginBottom: 8,
    textAlign: "center",
  },
  loginSubtitle: {
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#8A2BE2",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
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
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E6E6FA",
  },
  dividerText: {
    color: "#666",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  emergencyButton: {
    flexDirection: "row",
    backgroundColor: "#FF69B4",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
    shadowColor: "#FF69B4",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emergencyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#8A2BE2",
    fontSize: 14,
    fontWeight: "bold",
  },
  securityFeatures: {
    backgroundColor: "#F8F8FF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E6E6FA",
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B0082",
    marginBottom: 12,
    textAlign: "center",
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    color: "#666",
    fontSize: 14,
  },
});
