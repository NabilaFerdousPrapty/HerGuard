import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

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
  placeholder: "#A9A9A9", // Light gray for input placeholders
  borderColor: "#D3D3D3", // Light gray for borders
};

export default function GuardiansScreen() {
  const [guardians, setGuardians] = useState([
    { name: "Mom", phone: "+8801712345678" },
    { name: "Best Friend", phone: "+8801812345678" },
    { name: "Husband", phone: "+8801912345678" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGuardianName, setNewGuardianName] = useState("");
  const [newGuardianPhone, setNewGuardianPhone] = useState("");

  const addGuardian = () => {
    if (newGuardianName && newGuardianPhone) {
      setGuardians([
        ...guardians,
        { name: newGuardianName, phone: newGuardianPhone },
      ]);
      setNewGuardianName("");
      setNewGuardianPhone("");
      setModalVisible(false);
      Alert.alert("Success", `${newGuardianName} added as a guardian!`);
    } else {
      Alert.alert("Error", "Please fill in both name and phone number.");
    }
  };

  const removeGuardian = (index) => {
    Alert.alert(
      "Remove Guardian",
      `Are you sure you want to remove ${guardians[index].name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            const updatedGuardians = guardians.filter((_, i) => i !== index);
            setGuardians(updatedGuardians);
            Alert.alert(
              "Removed",
              `${guardians[index].name} has been removed.`
            );
          },
        },
      ]
    );
  };

  const callGuardian = (phoneNumber) => {
    // In a real app, you would use Linking to make a call:
    // Linking.openURL(`tel:${phoneNumber}`);
    Alert.alert("Call Guardian", `Calling ${phoneNumber}... (Simulated)`);
  };

  const messageGuardian = (phoneNumber) => {
    // In a real app, you would use Linking to send an SMS:
    // Linking.openURL(`sms:${phoneNumber}`);
    Alert.alert("Message Guardian", `Messaging ${phoneNumber}... (Simulated)`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "My Guardians",
          headerStyle: {
            backgroundColor: Colors.lightBackground,
          },
          headerTintColor: Colors.darkText,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <ScrollView style={styles.container}>
        {/* Current Guardians */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR TRUSTED GUARDIANS</Text>
          {guardians.length === 0 ? (
            <Text style={styles.noGuardiansText}>No guardians added yet.</Text>
          ) : (
            guardians.map((guardian, index) => (
              <View key={index} style={styles.guardianCard}>
                <Ionicons
                  name="person-circle"
                  size={32}
                  color={Colors.primary}
                />
                <View style={styles.guardianInfo}>
                  <Text style={styles.guardianName}>{guardian.name}</Text>
                  <Text style={styles.guardianPhone}>{guardian.phone}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: Colors.accentPurple },
                  ]}
                  onPress={() => callGuardian(guardian.phone)}
                >
                  <Ionicons name="call" size={20} color={Colors.lightText} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: Colors.accentPink },
                  ]}
                  onPress={() => messageGuardian(guardian.phone)}
                >
                  <Ionicons
                    name="chatbubbles"
                    size={20}
                    color={Colors.lightText}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: Colors.warning },
                  ]}
                  onPress={() => removeGuardian(index)}
                >
                  <Ionicons name="close" size={20} color={Colors.lightText} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Add New Guardian */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADD NEW GUARDIAN</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add-circle" size={24} color={Colors.lightText} />
            <Text style={styles.addButtonText}>Add Guardian</Text>
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>IMPORTANT</Text>
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              • Guardians receive your emergency alerts and location.
            </Text>
            <Text style={styles.instructionText}>
              • Make sure their contact info is up-to-date.
            </Text>
            <Text style={styles.instructionText}>
              • Keep your guardian list small for quick responses.
            </Text>
          </View>
        </View>

        {/* Add Guardian Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add New Guardian</Text>
              <TextInput
                style={styles.input}
                placeholder="Guardian Name"
                placeholderTextColor={Colors.placeholder}
                value={newGuardianName}
                onChangeText={setNewGuardianName}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number (e.g., +8801...)"
                placeholderTextColor={Colors.placeholder}
                keyboardType="phone-pad"
                value={newGuardianPhone}
                onChangeText={setNewGuardianPhone}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: Colors.accentPink },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
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
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  section: {
    padding: 15,
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: Colors.mediumBackground,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  noGuardiansText: {
    color: Colors.darkText,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
  guardianCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBackground, // Lighter background for the card
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Colors.borderColor, // Subtle border
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 2,
  },
  guardianInfo: {
    flex: 1,
    marginLeft: 10,
  },
  guardianName: {
    color: Colors.darkText,
    fontSize: 16,
    fontWeight: "bold",
  },
  guardianPhone: {
    color: Colors.darkText,
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: Colors.lightText,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  instructionsSection: {
    padding: 15,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 30, // More bottom margin
    backgroundColor: Colors.mediumBackground,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructions: {
    // No specific background, uses section's background
    paddingTop: 5, // Give some space
  },
  instructionText: {
    color: Colors.darkText,
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)", // Darker overlay for modal
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.lightBackground, // Light background for modal
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%", // Make modal a bit wider
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  input: {
    height: 50,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
    color: Colors.darkText,
    backgroundColor: Colors.lightBackground, // Ensure input background is light
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  modalButton: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    width: "48%", // Two buttons side-by-side
    alignItems: "center",
  },
  modalButtonText: {
    color: Colors.lightText,
    fontWeight: "bold",
    textAlign: "center",
  },
});
