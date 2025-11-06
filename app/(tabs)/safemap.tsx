import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
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
};

export default function SafeMapScreen() {
  const safeZones = [
    {
      name: "Dhaka Metropolitan Police",
      type: "Police Station",
      distance: "0.5 km",
    },
    { name: "Apollo Hospital", type: "Hospital", distance: "1.2 km" },
    {
      name: "Bashundhara Shopping Mall",
      type: "Safe Zone",
      distance: "0.8 km",
    },
    {
      name: "Gulshan Police Station",
      type: "Police Station",
      distance: "2.1 km",
    },
  ];

  const quickRoutes = [
    { destination: "Home", time: "15 min", safety: "High" },
    { destination: "Work", time: "25 min", safety: "Medium" },
    { destination: "University", time: "20 min", safety: "High" },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Safe Map",
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
        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={50} color={Colors.darkText} />
          <Text style={styles.mapText}>Live Safe Map</Text>
          <Text style={styles.mapSubtext}>Showing safe zones and routes</Text>
        </View>

        {/* Nearby Safe Zones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEARBY SAFE ZONES</Text>
          {safeZones.map((zone, index) => (
            <TouchableOpacity key={index} style={styles.zoneCard}>
              <View style={styles.zoneIcon}>
                <Ionicons
                  name={
                    zone.type === "Police Station"
                      ? "shield"
                      : zone.type === "Hospital"
                      ? "medical"
                      : "business"
                  }
                  size={24}
                  color={Colors.primary} // Icon color from primary palette
                />
              </View>
              <View style={styles.zoneInfo}>
                <Text style={styles.zoneName}>{zone.name}</Text>
                <Text style={styles.zoneType}>{zone.type}</Text>
              </View>
              <Text style={styles.zoneDistance}>{zone.distance}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Safe Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SAFE ROUTES</Text>
          {quickRoutes.map((route, index) => (
            <TouchableOpacity key={index} style={styles.routeCard}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeDestination}>{route.destination}</Text>
                <Text style={styles.routeTime}>{route.time}</Text>
              </View>
              <View
                style={[
                  styles.safetyBadge,
                  {
                    backgroundColor:
                      route.safety === "High"
                        ? Colors.success
                        : Colors.accentPink, // Use accent for medium safety
                  },
                ]}
              >
                <Text style={styles.safetyText}>{route.safety} Safety</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Quick Actions */}
        <View style={styles.emergencyActions}>
          <TouchableOpacity
            style={[
              styles.emergencyButton,
              { backgroundColor: Colors.primary },
            ]}
          >
            <Ionicons name="navigate" size={24} color={Colors.lightText} />
            <Text style={styles.emergencyButtonText}>
              Navigate to Nearest Safe Zone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.emergencyButton,
              { backgroundColor: Colors.accentPurple },
            ]}
          >
            <Ionicons name="share-social" size={24} color={Colors.lightText} />
            <Text style={styles.emergencyButtonText}>Share Live Location</Text>
          </TouchableOpacity>
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
  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.mediumBackground, // Use medium background for map area
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 15,
    borderColor: Colors.accentPurple, // Add a border for definition
    borderWidth: 1,
  },
  mapText: {
    color: Colors.darkText, // Dark text
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  mapSubtext: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    marginTop: 5,
    opacity: 0.7, // Slightly faded
  },
  section: {
    padding: 15,
    marginHorizontal: 15, // Add margin for card-like appearance
  },
  sectionTitle: {
    color: Colors.primary, // Primary color for titles
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  zoneCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mediumBackground, // Light background for cards
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Colors.accentPink, // Subtle border
    borderWidth: 1,
  },
  zoneIcon: {
    marginRight: 15,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneName: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontWeight: "bold",
  },
  zoneType: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    opacity: 0.7,
  },
  zoneDistance: {
    color: Colors.primary, // Primary color for distance
    fontSize: 14,
    fontWeight: "bold",
  },
  routeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mediumBackground, // Light background for cards
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Colors.accentPurple, // Subtle border
    borderWidth: 1,
  },
  routeInfo: {
    flex: 1,
  },
  routeDestination: {
    color: Colors.darkText, // Dark text
    fontSize: 16,
    fontWeight: "bold",
  },
  routeTime: {
    color: Colors.darkText, // Dark text
    fontSize: 14,
    opacity: 0.7,
  },
  safetyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  safetyText: {
    color: Colors.lightText, // White text on colored badge
    fontSize: 12,
    fontWeight: "bold",
  },
  emergencyActions: {
    padding: 15,
    marginHorizontal: 15, // Margin for consistency
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    // Background color set inline now using primary and accentPurple
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  emergencyButtonText: {
    color: Colors.lightText, // White text on colored button
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
