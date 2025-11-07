import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
};

export default function LegalRightsScreen() {
  const [expandedSection, setExpandedSection] = useState(null);

  const bangladeshLaws = [
    {
      id: "domestic",
      title: "Domestic Violence Act",
      lawNumber: "Act No. 18 of 2010",
      content:
        "Provides comprehensive protection against physical, psychological, sexual, and economic abuse within domestic relationships. Allows for immediate protection orders.",
      penalties: "Imprisonment up to 5 years, fine, or both.",
      helpline: "109",
    },
    {
      id: "nariShishu",
      title: "Nari o Shishu Nirjaton Daman Ain",
      lawNumber: "Act No. 8 of 2000",
      content:
        "Special law for prevention of oppression against women and children. Covers rape, sexual harassment, dowry-related violence, and acid throwing.",
      penalties: "Death penalty or life imprisonment for severe cases.",
      helpline: "999",
    },
    {
      id: "eveTeasing",
      title: "Anti-Eve Teasing & Stalking",
      lawNumber: "Section 509 of Penal Code",
      content:
        "Prohibits street harassment, stalking, and cyberstalking. Includes verbal abuse, unwelcome physical contact, and following without consent.",
      penalties: "Up to 1 year imprisonment, fine, or both.",
      helpline: "999",
    },
    {
      id: "cyber",
      title: "Digital Security Act",
      lawNumber: "Act No. 46 of 2018",
      content:
        "Addresses cyber bullying, unauthorized image sharing, online harassment, and defamation through digital means.",
      penalties: "Up to 7 years imprisonment and fine.",
      helpline: "01769996666",
    },
    {
      id: "workplace",
      title: "Workplace Harassment Prevention",
      lawNumber: "High Court Directive 2009",
      content:
        "Mandates all organizations to form complaint committees to address sexual harassment at workplace.",
      penalties: "Disciplinary action, compensation, legal proceedings.",
      helpline: "109",
    },
  ];

  const emergencyContacts = [
    { name: "National Emergency Service", number: "999", type: "Police" },
    { name: "Women & Children Help Desk", number: "109", type: "Support" },
    { name: "Legal Aid Services", number: "16430", type: "Legal" },
    { name: "Ambulance Service", number: "199", type: "Medical" },
    { name: "Cyber Crime Unit", number: "01769996666", type: "Cyber" },
    {
      name: "One Stop Crisis Center",
      number: "02-55165033",
      type: "Crisis",
    },
  ];

  const complaintSteps = [
    {
      step: 1,
      title: "Immediate Action",
      actions: [
        "Go to nearest police station.",
        "Call 999 for emergency response.",
        "Preserve any evidence.",
      ],
    },
    {
      step: 2,
      title: "File an FIR",
      actions: [
        "Provide detailed incident description.",
        "Request a copy of the FIR (First Information Report).",
        "Mention all relevant laws and sections.",
      ],
    },
    {
      step: 3,
      title: "Medical Examination",
      actions: [
        "Visit a government hospital for examination.",
        "Obtain a medical certificate.",
        "Ensure collection of forensic evidence.",
      ],
    },
    {
      step: 4,
      title: "Seek Legal Support",
      actions: [
        "Contact legal aid (16430).",
        "Consult a lawyer if needed.",
        "Regularly follow up on case progress.",
      ],
    },
  ];

  const quickResources = [
    {
      title: "Sample FIR Format",
      icon: "document-text",
      color: Colors.accentPurple,
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "A sample FIR format will be available here."
        ),
    },
    {
      title: "Women Police Stations",
      icon: "business",
      color: Colors.accentPink,
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "Map of nearby women police stations will open."
        ),
    },
    {
      title: "Legal Aid Centers",
      icon: "people",
      color: Colors.primary,
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "List of nearby legal aid centers will open."
        ),
    },
    {
      title: "Support Organizations",
      icon: "heart",
      color: Colors.accentPurple,
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "Directory of women's support NGOs and organizations."
        ),
    },
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const getContactIcon = (type) => {
    switch (type) {
      case "Police":
        return "shield";
      case "Medical":
        return "medical";
      case "Legal":
        return "briefcase"; // More specific for legal
      case "Support":
        return "people"; // More general for support
      case "Cyber":
        return "bug"; // Or desktop, computer
      case "Crisis":
        return "warning";
      default:
        return "call";
    }
  };

  const getContactColor = (type) => {
    switch (type) {
      case "Police":
        return Colors.warning; // Red for immediate police
      case "Medical":
        return Colors.success; // Green for medical
      case "Legal":
        return Colors.accentPurple; // Purple for legal
      case "Support":
        return Colors.accentPink; // Pink for general support
      case "Cyber":
        return Colors.primary; // Primary purple for cyber
      case "Crisis":
        return Colors.warning; // Red for crisis
      default:
        return Colors.darkText;
    }
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>
            <Ionicons name="sparkles" size={20} color={Colors.primary} /> YOUR
            LEGAL SHIELD
          </Text>
          <Text style={styles.headerSubtitle}>
            Understand your rights, navigate the law, and find essential support
            for women's safety in Bangladesh.
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📞 DIRECT HELPLINES (Tap to Call)
          </Text>
          <View style={styles.contactsGrid}>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={() => callNumber(contact.number)}
              >
                <View
                  style={[
                    styles.contactIconCircle,
                    { backgroundColor: getContactColor(contact.type) },
                  ]}
                >
                  <Ionicons
                    name={getContactIcon(contact.type)}
                    size={24}
                    color={Colors.lightText}
                  />
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
                {/* <Text style={styles.contactType}>{contact.type}</Text> Removed to save space, but can be added back */}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bangladesh Laws */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📚 KNOW YOUR LAWS (Bangladesh)
          </Text>
          {bangladeshLaws.map((law) => (
            <TouchableOpacity
              key={law.id}
              style={[
                styles.lawCard,
                expandedSection === law.id && styles.lawCardExpanded,
              ]}
              onPress={() => toggleSection(law.id)}
            >
              <View style={styles.lawHeader}>
                <View style={styles.lawTitleSection}>
                  <Text style={styles.lawTitle}>{law.title}</Text>
                  <Text style={styles.lawNumber}>{law.lawNumber}</Text>
                </View>
                <Ionicons
                  name={
                    expandedSection === law.id ? "chevron-up" : "chevron-down"
                  }
                  size={24}
                  color={Colors.primary}
                />
              </View>

              {expandedSection === law.id && (
                <View style={styles.lawContent}>
                  <Text style={styles.lawText}>{law.content}</Text>

                  <View style={styles.penaltySection}>
                    <Text style={styles.penaltyTitle}>Penalties:</Text>
                    <Text style={styles.penaltyText}>{law.penalties}</Text>
                  </View>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={[
                        styles.helplineButton,
                        { backgroundColor: Colors.accentPink },
                      ]}
                      onPress={() => callNumber(law.helpline)}
                    >
                      <Ionicons
                        name="call"
                        size={16}
                        color={Colors.lightText}
                      />
                      <Text style={styles.helplineText}>
                        Call Helpline ({law.helpline})
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.infoButton,
                        { borderColor: Colors.accentPurple },
                      ]}
                      onPress={() =>
                        Alert.alert(
                          "Full Text",
                          "Feature to view full legal text coming soon!"
                        )
                      }
                    >
                      <Ionicons
                        name="document-text"
                        size={16}
                        color={Colors.accentPurple}
                      />
                      <Text style={styles.infoText}>Read More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* How to File Complaint */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 GUIDE: FILING A COMPLAINT</Text>
          <View style={styles.complaintSteps}>
            {complaintSteps.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <View
                    style={[
                      styles.stepNumberCircle,
                      {
                        backgroundColor:
                          index % 2 === 0
                            ? Colors.accentPurple
                            : Colors.accentPink,
                      },
                    ]}
                  >
                    <Text style={styles.stepNumberText}>{step.step}</Text>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>
                <View style={styles.stepActions}>
                  {step.actions.map((action, actionIndex) => (
                    <View key={actionIndex} style={styles.actionItem}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={18}
                        color={Colors.primary} // Checkmarks in primary purple
                      />
                      <Text style={styles.actionText}>{action}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Legal Resources */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>🔗 QUICK LEGAL RESOURCES</Text>
          <View style={styles.resourcesGrid}>
            {quickResources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.resourceCard,
                  { borderColor: Colors.borderColor, borderWidth: 1 },
                ]}
                onPress={resource.onPress}
              >
                <Ionicons
                  name={resource.icon}
                  size={28}
                  color={resource.color}
                />
                <Text style={styles.resourceText}>{resource.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Empowerment Message */}
        <View style={styles.empowermentSection}>
          <Ionicons name="sparkles" size={40} color={Colors.primary} />
          <Text style={styles.empowermentTitle}>You Are Not Alone</Text>
          <Text style={styles.empowermentText}>
            Every woman has the right to safety and justice. Know your strength,
            know your rights, and never hesitate to seek help. We stand with
            you.
          </Text>
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
  headerSection: {
    padding: 20,
    backgroundColor: Colors.mediumBackground, // Slightly darker light background
    margin: 15,
    borderRadius: 15, // Softer corners
    borderWidth: 1,
    borderColor: Colors.borderColor, // Subtle border
    shadowColor: "#000", // Soft shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: Colors.primary, // Primary purple
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8, // More space
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    lineHeight: 22, // Improved readability
    textAlign: "center",
    opacity: 0.8,
  },
  section: {
    padding: 15,
    marginHorizontal: 15, // Consistent margins for card-like sections
    marginTop: 25, // Space between sections
  },
  sectionTitle: {
    color: Colors.primary, // Primary purple for titles
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 18, // More space
    textAlign: "center",
    letterSpacing: 0.5,
  },
  contactsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  contactCard: {
    backgroundColor: Colors.lightBackground, // Lighter background for cards
    padding: 15,
    borderRadius: 12, // Softer corners
    marginBottom: 10,
    width: "48%", // Two columns
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000", // Subtle shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  contactIconCircle: {
    width: 50, // Larger icon circles
    height: 50,
    borderRadius: 25, // Perfectly round
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // More space
  },
  contactName: {
    color: Colors.darkText, // Dark text
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  contactNumber: {
    color: Colors.primary, // Primary purple for numbers
    fontSize: 15, // Slightly larger for readability
    fontWeight: "bold",
  },
  // contactType: { // Removed, but styles kept commented if re-added
  //   color: Colors.darkText,
  //   fontSize: 10,
  //   textAlign: "center",
  //   opacity: 0.6,
  // },
  lawCard: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 15, // Softer corners
    marginBottom: 12, // More space between cards
    borderWidth: 1,
    borderColor: Colors.borderColor,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  lawCardExpanded: {
    borderColor: Colors.primary, // Highlight border when expanded
  },
  lawHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18, // More padding
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  lawTitleSection: {
    flex: 1,
    paddingRight: 10, // Space before chevron
  },
  lawTitle: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  lawNumber: {
    color: Colors.darkText, // Dark text
    fontSize: 12,
    opacity: 0.7,
  },
  lawContent: {
    padding: 18, // More padding
    paddingTop: 10, // Adjusted padding
  },
  lawText: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    lineHeight: 22, // Improved readability
    marginBottom: 15,
    opacity: 0.8,
  },
  penaltySection: {
    backgroundColor: Colors.mediumBackground, // Medium background for distinction
    padding: 15, // More padding
    borderRadius: 10, // Rounded corners
    marginBottom: 18, // More space
    borderLeftWidth: 4, // Accent stripe
    borderLeftColor: Colors.accentPink, // Pink stripe
  },
  penaltyTitle: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  penaltyText: {
    color: Colors.darkText, // Dark text
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.8,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  helplineButton: {
    flexDirection: "row",
    alignItems: "center",
    // Background color set inline
    paddingVertical: 12, // More padding
    paddingHorizontal: 15,
    borderRadius: 25, // Pill-shaped button
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    shadowColor: "#000", // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  helplineText: {
    color: Colors.lightText, // White text
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBackground, // Lighter background for contrast
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25, // Pill-shaped button
    borderWidth: 2, // Thicker border
    // Border color set inline
    flex: 1,
    justifyContent: "center",
    shadowColor: "#000", // Button shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoText: {
    color: Colors.accentPurple, // Accent purple text
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  complaintSteps: {
    backgroundColor: Colors.mediumBackground,
    padding: 20, // More padding
    borderRadius: 15, // Softer corners
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  stepCard: {
    marginBottom: 25, // More space between steps
    borderLeftWidth: 3, // Accent stripe
    borderLeftColor: Colors.accentPurple, // Default stripe color
    paddingLeft: 10, // Space for the stripe
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stepNumberCircle: {
    width: 35, // Larger circle
    height: 35,
    borderRadius: 17.5, // Perfectly round
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15, // More space
  },
  stepNumberText: {
    color: Colors.lightText, // White number
    fontSize: 17, // Larger font
    fontWeight: "bold",
  },
  stepTitle: {
    color: Colors.primary, // Primary purple for step titles
    fontSize: 16,
    fontWeight: "bold",
    flex: 1, // Take available space
  },
  stepActions: {
    marginLeft: 50, // Indent actions
    marginTop: 5,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  actionText: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    marginLeft: 10, // More space
    flex: 1,
    lineHeight: 22,
    opacity: 0.8,
  },
  resourcesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resourceCard: {
    backgroundColor: Colors.lightBackground,
    padding: 15,
    borderRadius: 12, // Softer corners
    marginBottom: 10,
    width: "48%", // Two columns
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  resourceText: {
    color: Colors.darkText, // Dark text
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 18,
  },
  empowermentSection: {
    padding: 30, // More padding
    backgroundColor: Colors.accentPink + "30", // Very light, transparent pink background
    margin: 15,
    borderRadius: 15, // Softer corners
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.accentPink, // Pink border
    shadowColor: Colors.accentPink, // Pinkish glow shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  empowermentTitle: {
    color: Colors.primary, // Primary purple
    fontSize: 20, // Larger title
    fontWeight: "bold",
    marginTop: 15, // More space
    marginBottom: 10,
    letterSpacing: 0.8,
  },
  empowermentText: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.9,
  },
});
