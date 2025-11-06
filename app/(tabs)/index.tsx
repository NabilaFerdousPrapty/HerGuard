import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

// Define the new color palette for a light theme
const Colors = {
  primary: "#BF40BF", // Medium purple (can still be the accent)
  accentPink: "#FFB6C1", // Light pink
  accentPurple: "#DA70D6", // Orchid (a lighter purple)
  lightBackground: "#F5F0F5", // Very light purple/gray for the main background
  mediumBackground: "#EDE7F6", // Slightly darker light background for sections
  darkText: "#333333", // Dark gray for text on light backgrounds
  lightText: "#FFFFFF", // White text (used sparingly for active buttons)
  success: "#4CAF50", // Green for success states
  warning: "#FF0000", // Red for warnings
};

export default function HomeScreen() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(10);

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
    startEvidenceMode();
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
    console.log("Evidence mode started - recording audio and taking photos");
    Alert.alert(
      "Evidence Mode Activated",
      "Audio and photo recording has started automatically."
    );
  };

  const quickActions = [
    {
      title: "Voice Trigger",
      icon: "mic",
      color: Colors.accentPurple,
      onPress: () =>
        Alert.alert("Voice Trigger", 'Listening for "HERGuard Help!"...'),
    },
    {
      title: "AI Detection",
      icon: "shield-checkmark",
      color: Colors.accentPink,
      onPress: () =>
        Alert.alert("AI Detection", "AI distress detection activated"),
    },
    {
      title: "Evidence Mode",
      icon: "camera",
      color: Colors.primary,
      onPress: () => startEvidenceMode(),
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}>
        {/* Emergency SOS Button */}
        <View style={styles.sosSection}>
          <Text style={styles.sectionTitle}>EMERGENCY SOS</Text>
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
                color={Colors.lightText} // Still white on the red button
                style={styles.warningIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.sosSubtitle}>
            {emergencyActive
              ? `Emergency alert will send in ${countdown} seconds`
              : "Press in case of emergency"}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickAction, { backgroundColor: action.color }]}
                onPress={action.onPress}
              >
                <Ionicons
                  name={action.icon}
                  size={28}
                  color={Colors.lightText}
                />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Status Indicators */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>SYSTEM STATUS</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <Ionicons name="location" size={20} color={Colors.success} />
              <Text style={styles.statusText}>GPS Active</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="wifi" size={20} color={Colors.success} />
              <Text style={styles.statusText}>Online Mode</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons name="mic" size={20} color={Colors.success} />
              <Text style={styles.statusText}>Voice Ready</Text>
            </View>
            <View style={styles.statusItem}>
              <Ionicons
                name="shield-checkmark"
                size={20}
                color={Colors.success}
              />
              <Text style={styles.statusText}>AI Active</Text>
            </View>
          </View>
        </View>

        {/* Emergency Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>EMERGENCY INSTRUCTIONS</Text>
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              • Press SOS button for immediate help
            </Text>
            <Text style={styles.instructionText}>
              • Say "HERGuard Help" for voice trigger
            </Text>
            <Text style={styles.instructionText}>
              • App automatically detects distress sounds
            </Text>
            <Text style={styles.instructionText}>
              • Cancel within 10 seconds if safe
            </Text>
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
    marginTop: 20,
    backgroundColor: Colors.mediumBackground, // Slightly different light background for contrast
    marginHorizontal: 15,
    borderRadius: 15,
    paddingBottom: 30, // Give more space at the bottom of the SOS section
  },
  sectionTitle: {
    color: Colors.primary, // Using primary color for titles
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  sosButton: {
    backgroundColor: Colors.primary,
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  sosButtonActive: {
    backgroundColor: Colors.warning, // Red for active emergency
    shadowColor: Colors.warning,
  },
  sosButtonText: {
    color: Colors.lightText, // White text on the purple/red button
    fontSize: 24,
    fontWeight: "bold",
  },
  warningIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  sosSubtitle: {
    color: Colors.darkText, // Dark text on the light background
    marginTop: 15,
    textAlign: "center",
    fontSize: 14,
  },
  quickActionsSection: {
    padding: 20,
    marginHorizontal: 15,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  quickAction: {
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    width: "30%",
    // These buttons maintain their accent colors with white text
  },
  quickActionText: {
    color: Colors.lightText,
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
  },
  statusSection: {
    padding: 20,
    marginHorizontal: 15,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mediumBackground, // Use a consistent background for items
    borderWidth: 1,
    borderColor: Colors.accentPurple, // Subtle border
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "48%",
  },
  statusText: {
    color: Colors.darkText, // Dark text on the light background
    marginLeft: 8,
    fontSize: 12,
  },
  instructionsSection: {
    padding: 20,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  instructions: {
    backgroundColor: Colors.mediumBackground, // Consistent background for instructions
    borderWidth: 1,
    borderColor: Colors.accentPink, // Subtle border
    padding: 15,
    borderRadius: 10,
  },
  instructionText: {
    color: Colors.darkText, // Dark text on the light background
    marginBottom: 8,
    fontSize: 14,
  },
});
