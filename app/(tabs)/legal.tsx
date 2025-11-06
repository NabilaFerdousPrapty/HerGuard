import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
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
  borderColor: "#D3D3D3", // Light gray for borders
};

export default function LegalRightsScreen() {
  const [expandedSection, setExpandedSection] = useState(null);

  const legalSections = [
    {
      id: "domestic",
      title: "Domestic Violence Act",
      content:
        "Protection against physical, mental, economic, and sexual abuse within domestic relationships. Immediate protection orders available.",
      helpline: "109",
    },
    {
      id: "eveTeasing",
      title: "Anti-Eve Teasing & Stalking",
      content:
        "Strict laws against street harassment, stalking, and cyberstalking. Punishable by imprisonment and fines.",
      helpline: "999",
    },
    {
      id: "cyber",
      title: "Cyber Security & Harassment",
      content:
        "Laws against cyber bullying, unauthorized image sharing, and online harassment under the Digital Security Act.",
      helpline: "01769996666",
    },
    {
      id: "workplace",
      title: "Workplace Harassment",
      content:
        "Protection against sexual harassment at workplace. Mandatory committees required in organizations.",
      helpline: "109",
    },
    {
      id: "legalAid",
      title: "Free Legal Aid",
      content:
        "Free legal services available for women who cannot afford legal representation.",
      helpline: "16430",
    },
  ];

  const emergencyContacts = [
    { name: "National Emergency Service", number: "999" },
    { name: "Women & Children Help Desk", number: "109" },
    { name: "Legal Aid Services", number: "16430" },
    { name: "Ambulance Service", number: "199" },
    { name: "Cyber Crime Unit", number: "01769996666" },
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Legal Rights & Info",
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
        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EMERGENCY CONTACTS</Text>
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={() => callNumber(contact.number)}
            >
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              <Ionicons name="call" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Legal Rights Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL RIGHTS & LAWS</Text>
          {legalSections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.lawCard,
                expandedSection === section.id && styles.lawCardExpanded,
              ]}
              onPress={() => toggleSection(section.id)}
            >
              <View style={styles.lawHeader}>
                <Text style={styles.lawTitle}>{section.title}</Text>
                <Ionicons
                  name={
                    expandedSection === section.id
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={24}
                  color={Colors.primary}
                />
              </View>

              {expandedSection === section.id && (
                <View style={styles.lawContent}>
                  <Text style={styles.lawText}>{section.content}</Text>
                  <TouchableOpacity
                    style={styles.helplineButton}
                    onPress={() => callNumber(section.helpline)}
                  >
                    <Ionicons name="call" size={16} color={Colors.lightText} />
                    <Text style={styles.helplineText}>
                      Helpline: {section.helpline}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* How to File Complaint */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW TO FILE A COMPLAINT</Text>
          <View style={styles.complaintSteps}>
            <View style={styles.step}>
              <Text
                style={[
                  styles.stepNumber,
                  { backgroundColor: Colors.accentPurple },
                ]}
              >
                1
              </Text>
              <Text style={styles.stepText}>
                Go to nearest police station or call 999
              </Text>
            </View>
            <View style={styles.step}>
              <Text
                style={[
                  styles.stepNumber,
                  { backgroundColor: Colors.accentPink },
                ]}
              >
                2
              </Text>
              <Text style={styles.stepText}>
                Provide details of the incident
              </Text>
            </View>
            <View style={styles.step}>
              <Text
                style={[
                  styles.stepNumber,
                  { backgroundColor: Colors.accentPurple },
                ]}
              >
                3
              </Text>
              <Text style={styles.stepText}>Request a copy of the FIR</Text>
            </View>
            <View style={styles.step}>
              <Text
                style={[
                  styles.stepNumber,
                  { backgroundColor: Colors.accentPink },
                ]}
              >
                4
              </Text>
              <Text style={styles.stepText}>
                Contact legal aid if needed (16430)
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="document-text" size={24} color={Colors.primary} />
              <Text style={styles.quickActionText}>Sample FIR Format</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="business" size={24} color={Colors.accentPurple} />
              <Text style={styles.quickActionText}>Nearby Police Stations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Ionicons name="people" size={24} color={Colors.accentPink} />
              <Text style={styles.quickActionText}>Legal Aid Centers</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginHorizontal: 15, // Add horizontal margin for card-like sections
    marginTop: 20, // Space between sections
    backgroundColor: Colors.mediumBackground,
    borderRadius: 15,
    shadowColor: "#000", // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    color: Colors.primary, // Primary purple for titles
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center", // Center align titles
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBackground, // Lighter background for cards
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Colors.borderColor, // Subtle border
    borderWidth: 1,
    shadowColor: "#000", // Subtle shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontWeight: "bold",
  },
  contactNumber: {
    color: Colors.primary, // Primary purple for numbers
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold", // Emphasize number
  },
  lawCard: {
    backgroundColor: Colors.lightBackground, // Light background for expandable cards
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    borderColor: Colors.borderColor,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 2,
  },
  lawCardExpanded: {
    borderColor: Colors.accentPurple, // Highlight border when expanded
  },
  lawHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1, // Separator for header
    borderBottomColor: Colors.borderColor,
  },
  lawTitle: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  lawContent: {
    padding: 15,
    paddingTop: 10, // Give some padding at the top
  },
  lawText: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    lineHeight: 22, // Improve readability
    marginBottom: 15,
    opacity: 0.8, // Slightly faded for body text
  },
  helplineButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.accentPink, // Pink for helpline button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
    shadowColor: "#000", // Subtle shadow for button
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  helplineText: {
    color: Colors.lightText, // White text
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  complaintSteps: {
    // This entire section uses Colors.mediumBackground as its container
    paddingVertical: 10, // Adjust padding
  },
  step: {
    flexDirection: "row",
    alignItems: "center", // Vertically align number and text
    marginBottom: 15,
  },
  stepNumber: {
    color: Colors.lightText, // White number on colored background
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
    // Background color set inline now using accentPurple and accentPink
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30, // Vertically center text
    borderRadius: 15,
    // No shadow here, let the section container handle it
  },
  stepText: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    flex: 1,
    lineHeight: 22,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around", // Use space-around for even spacing
  },
  quickAction: {
    alignItems: "center",
    backgroundColor: Colors.lightBackground, // Lighter background for quick actions
    padding: 15,
    borderRadius: 10,
    width: "30%", // Maintain width
    borderColor: Colors.borderColor,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 2,
  },
  quickActionText: {
    color: Colors.darkText, // Dark text
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
    fontWeight: "bold", // Emphasize text
  },
});
