import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal, // Import Modal
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Define the new color palette
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
  placeholderText: "#A0A0A0", // Darker gray for placeholders
  switchInactiveTrack: "#D1C4E9", // Lighter purple for inactive switch track
  switchInactiveThumb: "#F5F5F5", // Off-white for inactive switch thumb
  overlay: "rgba(0,0,0,0.5)", // Dark overlay for modal background
};

export default function GuardiansScreen() {
  const [guardians, setGuardians] = useState([
    {
      id: "1",
      name: "Mother",
      phone: "+8801712345678",
      status: "Active",
      type: "Family",
    },
    {
      id: "2",
      name: "Father",
      phone: "+8801712345679",
      status: "Active",
      type: "Family",
    },
    {
      id: "3",
      name: "Best Friend",
      phone: "+8801712345680",
      status: "Pending",
      type: "Friend",
    },
  ]);

  const [newGuardian, setNewGuardian] = useState({
    name: "",
    phone: "",
    type: "Family", // Default type
  });
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Existing auto-alert settings
  const [autoSendLocation, setAutoSendLocation] = useState(true);
  const [sendEvidence, setSendEvidence] = useState(true);
  const [offlineSMS, setOfflineSMS] = useState(true);

  const addGuardian = () => {
    if (newGuardian.name && newGuardian.phone) {
      setGuardians([
        ...guardians,
        {
          id: Date.now().toString(),
          name: newGuardian.name,
          phone: newGuardian.phone,
          type: newGuardian.type,
          status: "Pending",
        },
      ]);
      setNewGuardian({ name: "", phone: "", type: "Family" }); // Reset form
      setModalVisible(false); // Close modal
      Alert.alert(
        "Invitation Sent",
        `${newGuardian.name} has been invited to your Guardian Circle! They will receive alerts and your live location during emergencies.`
      );
    } else {
      Alert.alert("Input Error", "Please fill in both name and phone number.");
    }
  };

  const removeGuardian = (id) => {
    Alert.alert(
      "Remove Guardian",
      "Are you sure you want to remove this guardian from your circle?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () =>
            setGuardians(guardians.filter((guardian) => guardian.id !== id)),
        },
      ]
    );
  };

  const testEmergencyAlert = () => {
    Alert.alert(
      "Test Alert Sent!",
      "A test emergency alert with your current location has been sent to all active guardians. Check your guardians' devices for confirmation.",
      [{ text: "OK" }]
    );
  };

  const autoEmergencyFeatures = [
    {
      title: "Auto-send Location",
      description: "Share your GPS coordinates with guardians during alerts",
      icon: "location",
      enabled: autoSendLocation,
      onToggle: setAutoSendLocation,
      color: Colors.accentPurple,
    },
    {
      title: "Evidence Collection",
      description: "Auto-record audio & photos during emergencies",
      icon: "camera",
      enabled: sendEvidence,
      onToggle: setSendEvidence,
      color: Colors.accentPink,
    },
    {
      title: "Offline SMS Fallback",
      description: "Send alerts via SMS when no internet is available",
      icon: "chatbubble",
      enabled: offlineSMS,
      onToggle: setOfflineSMS,
      color: Colors.primary,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Guardian Circle",
          headerStyle: {
            backgroundColor: Colors.lightBackground,
          },
          headerTintColor: Colors.darkText,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Guardian Circle Header */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>
            <Ionicons name="people" size={20} color={Colors.primary} /> YOUR
            GUARDIAN CIRCLE
          </Text>
          <Text style={styles.headerSubtitle}>
            These trusted contacts receive your emergency alerts, live location,
            and evidence.
          </Text>
        </View>

        {/* Current Guardians */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            MY GUARDIANS (
            <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
              {guardians.filter((g) => g.status === "Active").length}
            </Text>{" "}
            Active)
          </Text>
          {guardians.length === 0 ? (
            <Text style={styles.noGuardiansText}>No guardians added yet.</Text>
          ) : (
            guardians.map((guardian) => (
              <View key={guardian.id} style={styles.guardianCard}>
                <View
                  style={[
                    styles.guardianAvatar,
                    {
                      backgroundColor:
                        guardian.type === "Family"
                          ? Colors.accentPurple
                          : Colors.accentPink,
                    },
                  ]}
                >
                  <Ionicons
                    name={guardian.type === "Family" ? "heart" : "person"}
                    size={22}
                    color={Colors.lightText}
                  />
                </View>
                <View style={styles.guardianInfo}>
                  <Text style={styles.guardianName}>{guardian.name}</Text>
                  <Text style={styles.guardianPhone}>{guardian.phone}</Text>
                  <View style={styles.guardianMeta}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            guardian.status === "Active"
                              ? Colors.success
                              : Colors.accentPink,
                        },
                      ]}
                    >
                      <Text style={styles.statusText}>{guardian.status}</Text>
                    </View>
                    <Text style={styles.guardianType}>
                      {guardian.type} Contact
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeGuardian(guardian.id)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color={Colors.warning}
                  />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Floating Add Guardian Button (or positioned at bottom of scroll) */}
        {/* Changed from a section to a standalone button to trigger modal */}
        <TouchableOpacity
          style={styles.openModalButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="person-add" size={24} color={Colors.lightText} />
          <Text style={styles.openModalButtonText}>Invite New Guardian</Text>
        </TouchableOpacity>

        {/* Emergency Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EMERGENCY ALERT SETTINGS</Text>
          <View style={styles.featuresGrid}>
            {autoEmergencyFeatures.map((feature, index) => (
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
                      size={22}
                      color={Colors.lightText}
                    />
                  </View>
                  <Switch
                    value={feature.enabled}
                    onValueChange={feature.onToggle}
                    trackColor={{
                      false: Colors.switchInactiveTrack,
                      true: feature.color + "90",
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
              </View>
            ))}
          </View>
        </View>

        {/* Test Emergency System */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>TEST THE SYSTEM</Text>
          <TouchableOpacity
            style={styles.testButton}
            onPress={testEmergencyAlert}
          >
            <Ionicons name="alert-circle" size={24} color={Colors.lightText} />
            <Text style={styles.testButtonText}>
              Send a Test Emergency Alert
            </Text>
          </TouchableOpacity>
          <Text style={styles.testDescription}>
            Tap to send a safe test alert to your active guardians. This helps
            you verify everything is working correctly without triggering a real
            emergency.
          </Text>
        </View>
      </ScrollView>

      {/* Add Guardian Modal */}
      <Modal
        animationType="fade" // Fade in/out
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setNewGuardian({ name: "", phone: "", type: "Family" }); // Clear form on close
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Invite New Guardian</Text>
            <TextInput
              style={styles.input}
              placeholder="Guardian's Name"
              placeholderTextColor={Colors.placeholderText}
              value={newGuardian.name}
              onChangeText={(text) =>
                setNewGuardian({ ...newGuardian, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number (e.g., +8801...)"
              placeholderTextColor={Colors.placeholderText}
              value={newGuardian.phone}
              onChangeText={(text) =>
                setNewGuardian({ ...newGuardian, phone: text })
              }
              keyboardType="phone-pad"
            />
            <View style={styles.typeSelectorModal}>
              <Text style={styles.typeLabel}>Relationship:</Text>
              <View style={styles.typeButtonsModal}>
                {["Family", "Friend", "Other"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButtonModal,
                      {
                        backgroundColor:
                          newGuardian.type === type
                            ? Colors.accentPurple
                            : Colors.lightBackground,
                        borderColor:
                          newGuardian.type === type
                            ? Colors.accentPurple
                            : Colors.borderColor,
                      },
                    ]}
                    onPress={() => setNewGuardian({ ...newGuardian, type })}
                  >
                    <Text
                      style={[
                        styles.typeButtonTextModal,
                        {
                          color:
                            newGuardian.type === type
                              ? Colors.lightText
                              : Colors.darkText,
                        },
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: Colors.accentPink },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setNewGuardian({ name: "", phone: "", type: "Family" }); // Clear form on cancel
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={addGuardian}
              >
                <Text style={styles.modalButtonText}>Send Invitation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  headerSection: {
    padding: 20,
    backgroundColor: Colors.mediumBackground,
    margin: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: Colors.darkText,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    opacity: 0.8,
  },
  section: {
    padding: 15,
    marginHorizontal: 15,
    marginTop: 25,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  noGuardiansText: {
    color: Colors.darkText,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
    opacity: 0.7,
  },
  guardianCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBackground,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  guardianAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  guardianInfo: {
    flex: 1,
  },
  guardianName: {
    color: Colors.darkText,
    fontSize: 16,
    fontWeight: "bold",
  },
  guardianPhone: {
    color: Colors.darkText,
    fontSize: 13,
    marginTop: 2,
    opacity: 0.7,
  },
  guardianMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  guardianType: {
    color: Colors.darkText,
    fontSize: 12,
    marginLeft: 8,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    color: Colors.lightText,
    fontSize: 11,
    fontWeight: "bold",
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  // Replaced addForm and related styles with openModalButton
  openModalButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary, // Primary purple for the invite button
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  openModalButtonText: {
    color: Colors.lightText,
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    letterSpacing: 0.5,
  },

  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: Colors.mediumBackground,
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    width: "100%", // Full width for these features
    borderWidth: 1,
    borderColor: Colors.borderColor,
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
    marginBottom: 15,
  },
  featureIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    color: Colors.darkText,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featureDescription: {
    color: Colors.darkText,
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.7,
  },
  testButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  testButtonText: {
    color: Colors.lightText,
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  testDescription: {
    color: Colors.darkText,
    fontSize: 13,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 20,
    opacity: 0.8,
  },

  // Modal Specific Styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.overlay, // Dark transparent overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.lightBackground, // Light background for the modal content
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    width: "90%", // Make modal a bit wider
  },
  modalTitle: {
    marginBottom: 25, // More space
    textAlign: "center",
    fontSize: 20, // Larger title
    fontWeight: "bold",
    color: Colors.primary, // Primary purple
  },
  input: {
    backgroundColor: Colors.lightBackground, // Lightest background for input
    color: Colors.darkText, // Dark text
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  typeSelectorModal: {
    marginBottom: 20,
    width: "100%", // Full width in modal
  },
  typeLabel: {
    color: Colors.darkText,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "500",
  },
  typeButtonsModal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeButtonModal: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  typeButtonTextModal: {
    fontSize: 14,
    fontWeight: "bold",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 25, // More space
  },
  modalButton: {
    borderRadius: 10,
    padding: 15, // More padding
    elevation: 2,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  modalButtonText: {
    color: Colors.lightText,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
