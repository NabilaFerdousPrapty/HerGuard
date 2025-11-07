import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

// Define the new color palette for a light theme
const Colors = {
  primary: "#BF40BF", // Medium purple
  accentPink: "#FFB6C1", // Light pink
  accentPurple: "#DA70D6", // Orchid (a lighter purple)
  lightBackground: "#F5F0F5", // Very light purple/gray for the main background
  mediumBackground: "#EDE7F6", // Slightly darker light background for sections
  darkText: "#333333", // Dark gray for text on light backgrounds
  lightText: "#FFFFFF", // White text (used sparingly for active buttons)
  success: "#4CAF50", // Green for success states
  warning: "#FF0000", // Red for warnings
  borderColor: "#D3D3D3", // Light gray for borders
  switchInactiveTrack: "#D1C4E9", // Lighter purple for inactive switch track
  switchInactiveThumb: "#F5F5F5", // Off-white for inactive switch thumb
};

export default function HomeScreen() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [aiDetectionEnabled, setAiDetectionEnabled] = useState(true);
  const [voiceTriggerEnabled, setVoiceTriggerEnabled] = useState(true);
  const [evidenceModeEnabled, setEvidenceModeEnabled] = useState(true);

  useEffect(() => {
    let timer;
    if (emergencyActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (emergencyActive && countdown === 0) {
      triggerEmergencyAlert();
    }
    return () => clearTimeout(timer);
  }, [emergencyActive, countdown]);

  const triggerSOS = () => {
    Vibration.vibrate([500, 500, 500]);
    setEmergencyActive(true);
    setCountdown(10);
    // Only start evidence mode if it's enabled by the user
    if (evidenceModeEnabled) {
      startEvidenceMode();
    }
  };

  const cancelSOS = () => {
    setEmergencyActive(false);
    setCountdown(10);
    Vibration.cancel();
  };

  const triggerEmergencyAlert = () => {
    Alert.alert(
      "EMERGENCY ALERT SENT!",
      "Your location and emergency data have been sent to your guardians.",
      [{ text: "OK", onPress: () => setEmergencyActive(false) }]
    );
  };

  const startEvidenceMode = () => {
    // This function is now also called from triggerSOS, so the check is here.
    if (evidenceModeEnabled) {
      Alert.alert(
        "Evidence Mode Activated",
        "Recording audio and capturing photos for evidence..."
      );
    } else {
      Alert.alert(
        "Evidence Mode Disabled",
        "Please enable Evidence Mode in Quick Features to activate it during SOS."
      );
    }
  };

  const testVoiceTrigger = () => {
    Alert.alert(
      "Voice Trigger Active",
      'Listening for "HERGuard Help!" or "Help"...\n\nSpeak now...'
    );
  };

  const testAIDetection = () => {
    Alert.alert(
      "AI Distress Detection",
      "Monitoring for:\n• Scream-like sounds\n• Sudden movements\n• Falls and shakes"
    );
  };

  const features = [
    {
      title: "Voice Trigger",
      description: 'Hands-free "HERGuard Help!" activation',
      icon: "mic",
      color: Colors.accentPurple, // Use accent purple
      enabled: voiceTriggerEnabled,
      onToggle: setVoiceTriggerEnabled,
      onPress: testVoiceTrigger,
    },
    {
      title: "AI Detection",
      description: "Auto-detects screams & movements",
      icon: "shield-checkmark",
      color: Colors.accentPink, // Use accent pink
      enabled: aiDetectionEnabled,
      onToggle: setAiDetectionEnabled,
      onPress: testAIDetection,
    },
    {
      title: "Evidence Mode",
      description: "Records audio & photos during emergencies",
      icon: "camera",
      color: Colors.primary, // Use primary purple
      enabled: evidenceModeEnabled,
      onToggle: setEvidenceModeEnabled,
      onPress: startEvidenceMode,
    },
    {
      title: "Offline SMS",
      description: "Works without internet, sends alerts via SMS",
      icon: "chatbubble",
      color: Colors.accentPurple, // Can reuse accent purple
      enabled: true, // This feature is always conceptually "on"
      onPress: () =>
        Alert.alert(
          "Offline Mode",
          "SMS fallback ready, Guardians will be notified via SMS if internet is unavailable."
        ),
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Emergency SOS Button - Feature 1 */}
        <View style={styles.sosSection}>
          <Text style={styles.sectionTitle}>💜 SMART SOS BUTTON</Text>
          <TouchableOpacity
            style={[
              styles.sosButton,
              emergencyActive && styles.sosButtonActive,
            ]}
            onPress={emergencyActive ? cancelSOS : triggerSOS}
          >
            <Text style={styles.sosButtonText}>
              {emergencyActive ? `CANCEL (${countdown})` : "SOS"}
            </Text>
            {emergencyActive && (
              <Ionicons
                name="warning"
                size={30}
                color={Colors.lightText}
                style={styles.warningIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.sosSubtitle}>
            {emergencyActive
              ? `🚨 Auto alert in ${countdown} seconds if no response`
              : "Tap once for immediate help, location & alerts sent to guardians"}
          </Text>
        </View>

        {/* Quick Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>✨ EMPOWERING FEATURES</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureHeader}>
                  <View
                    style={[
                      styles.featureIcon,
                      { backgroundColor: feature.color },
                    ]}
                  >
                    <Ionicons
                      name={feature.icon}
                      size={24}
                      color={Colors.lightText}
                    />
                  </View>
                  <Switch
                    value={feature.enabled}
                    onValueChange={feature.onToggle}
                    trackColor={{
                      false: Colors.switchInactiveTrack,
                      true: feature.color + "90", // Slightly transparent active color
                    }}
                    thumbColor={
                      feature.enabled
                        ? feature.color
                        : Colors.switchInactiveThumb
                    }
                    ios_backgroundColor={Colors.switchInactiveTrack}
                  />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.featureButton,
                    { backgroundColor: feature.color },
                  ]}
                  onPress={feature.onPress}
                >
                  <Text style={styles.featureButtonText}>Test/Info</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Live Tracking Status - Feature 5 */}
        <View style={styles.trackingSection}>
          <Text style={styles.sectionTitle}>📍 YOUR PEACE OF MIND</Text>
          <View style={styles.trackingCard}>
            <View style={styles.trackingStatus}>
              <Ionicons name="location" size={24} color={Colors.success} />
              <View style={styles.trackingInfo}>
                <Text style={styles.trackingText}>GPS Tracking Active</Text>
                <Text style={styles.trackingSubtext}>
                  Real-time location sharing is ready. Always know where you
                  are.
                </Text>
              </View>
            </View>
            <View style={styles.trackingStats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Monitoring</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>Live</Text>
                <Text style={styles.statLabel}>Updates</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>Secure</Text>
                <Text style={styles.statLabel}>Privacy</Text>
              </View>
            </View>
          </View>
        </View>

        {/* System Status */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>⚙️ SYSTEM AT A GLANCE</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Ionicons name="wifi" size={20} color={Colors.success} />
              <Text style={styles.statusText}>Online Mode</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="notifications" size={20} color={Colors.success} />
              <Text style={styles.statusText}>Alerts Ready</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="shield" size={20} color={Colors.success} />
              <Text style={styles.statusText}>Protected</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="battery-full" size={20} color={Colors.success} />
              <Text style={styles.statusText}>Battery OK</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground, // Main background
  },
  sosSection: {
    alignItems: "center",
    padding: 20,
    marginTop: 10,
    backgroundColor: Colors.mediumBackground, // Slightly darker light background
    marginHorizontal: 15,
    borderRadius: 20, // More rounded
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Softer, more spread shadow
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    color: Colors.primary, // Primary purple for titles
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 18, // More space
    textAlign: "center",
    letterSpacing: 0.5, // Slightly more spread out
  },
  sosButton: {
    backgroundColor: Colors.primary, // Primary purple for SOS
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12, // More pronounced shadow
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15, // Larger shadow radius
  },
  sosButtonActive: {
    backgroundColor: Colors.warning, // Red for active emergency
    shadowColor: Colors.warning,
  },
  sosButtonText: {
    color: Colors.lightText, // White text
    fontSize: 24, // Slightly larger
    fontWeight: "bold",
    letterSpacing: 1,
  },
  warningIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  sosSubtitle: {
    color: Colors.darkText, // Dark text on light background
    marginTop: 20, // More space
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22, // Better readability
    paddingHorizontal: 10, // Prevent text from hitting edges
  },
  featuresSection: {
    padding: 15,
    marginHorizontal: 15, // Consistent horizontal margin
    marginTop: 25, // Space between sections
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: Colors.mediumBackground, // Light background for cards
    padding: 18, // More padding
    borderRadius: 15, // More rounded corners
    marginBottom: 15,
    width: "48%",
    borderWidth: 1,
    borderColor: Colors.borderColor, // Subtle border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  featureHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15, // More space
  },
  featureIcon: {
    width: 45, // Larger icon background
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    color: Colors.darkText, // Dark text
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featureDescription: {
    color: Colors.darkText, // Dark text
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 18,
    opacity: 0.7, // Slightly faded for description
  },
  featureButton: {
    paddingVertical: 8, // More padding
    paddingHorizontal: 15,
    borderRadius: 20, // Pill-shaped button
    alignSelf: "flex-start",
    shadowColor: "#000", // Subtle button shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  featureButtonText: {
    color: Colors.lightText, // White text
    fontSize: 13,
    fontWeight: "bold",
  },
  trackingSection: {
    padding: 15,
    marginHorizontal: 15, // Consistent horizontal margin
    marginTop: 25,
  },
  trackingCard: {
    backgroundColor: Colors.mediumBackground,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  trackingStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20, // More space
  },
  trackingInfo: {
    marginLeft: 15, // More space
    flex: 1,
  },
  trackingText: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontWeight: "bold",
  },
  trackingSubtext: {
    color: Colors.darkText, // Dark text
    fontSize: 13,
    marginTop: 5,
    lineHeight: 20,
    opacity: 0.7,
  },
  trackingStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1, // Separator
    borderTopColor: Colors.borderColor,
    paddingTop: 15, // Padding above stats
  },
  stat: {
    alignItems: "center",
    flex: 1, // Distribute space evenly
  },
  statNumber: {
    color: Colors.accentPurple, // Use accent purple for numbers
    fontSize: 18, // Larger number
    fontWeight: "bold",
  },
  statLabel: {
    color: Colors.darkText, // Dark text
    fontSize: 12,
    marginTop: 5,
    opacity: 0.8,
  },
  statusSection: {
    padding: 15,
    marginHorizontal: 15, // Consistent horizontal margin
    marginBottom: 30, // More bottom margin
    marginTop: 25,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mediumBackground,
    padding: 15, // More padding
    borderRadius: 12, // More rounded
    marginBottom: 10,
    width: "48%",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    color: Colors.darkText, // Dark text
    marginLeft: 10, // More space
    fontSize: 13,
    fontWeight: "500",
  },
});
