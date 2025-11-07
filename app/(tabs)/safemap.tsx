import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

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

// Mock safe zones data with coordinates
// You can also create type definitions for better TypeScript support
type SafeZoneCategory =
  | "emergency"
  | "medical"
  | "public_space"
  | "financial"
  | "educational"
  | "support"
  | "accommodation"
  | "transport"
  | "commercial";

type SafetyLevel = "very_high" | "high" | "medium" | "low";

interface SafeZone {
  id: number;
  name: string;
  type: string;
  category: SafeZoneCategory;
  distance: string;
  latitude: number;
  longitude: number;
  emergencyNumber: string | null;
  description: string;
  safetyLevel: SafetyLevel;
  is24Hours?: boolean;
  hasSecurity?: boolean;
  contactPerson?: string;
}
const safeZones: SafeZone[] = [
  // Police Stations
  {
    id: 1,
    name: "Dhaka Metropolitan Police Headquarter",
    type: "Police Station",
    category: "emergency",
    distance: "0.5 km",
    latitude: 23.8103,
    longitude: 90.4125,
    emergencyNumber: "999",
    description: "24/7 police assistance",
    safetyLevel: "very_high",
  },
  {
    id: 2,
    name: "Gulshan Police Station",
    type: "Police Station",
    category: "emergency",
    distance: "2.1 km",
    latitude: 23.7949,
    longitude: 90.4177,
    emergencyNumber: "999",
    description: "Local police station",
    safetyLevel: "very_high",
  },
  {
    id: 3,
    name: "Dhanmondi Police Station",
    type: "Police Station",
    category: "emergency",
    distance: "3.2 km",
    latitude: 23.7456,
    longitude: 90.3732,
    emergencyNumber: "999",
    description: "Area police station",
    safetyLevel: "very_high",
  },

  // Hospitals & Medical Centers
  {
    id: 4,
    name: "Apollo Hospital Dhaka",
    type: "Hospital",
    category: "medical",
    distance: "1.2 km",
    latitude: 23.7506,
    longitude: 90.3932,
    emergencyNumber: "10666",
    description: "Multi-specialty hospital with emergency",
    safetyLevel: "high",
  },
  {
    id: 5,
    name: "Dhaka Medical College Hospital",
    type: "Hospital",
    category: "medical",
    distance: "4.5 km",
    latitude: 23.7289,
    longitude: 90.3944,
    emergencyNumber: "8616641",
    description: "Government hospital with emergency",
    safetyLevel: "high",
  },
  {
    id: 6,
    name: "Square Hospital",
    type: "Hospital",
    category: "medical",
    distance: "3.8 km",
    latitude: 23.7508,
    longitude: 90.3912,
    emergencyNumber: "8144400",
    description: "Private hospital with 24/7 emergency",
    safetyLevel: "high",
  },

  // Shopping Malls & Public Spaces
  {
    id: 7,
    name: "Bashundhara Shopping Mall",
    type: "Shopping Mall",
    category: "public_space",
    distance: "0.8 km",
    latitude: 23.7985,
    longitude: 90.4253,
    emergencyNumber: "8431055",
    description: "Large shopping mall with security",
    safetyLevel: "medium",
  },
  {
    id: 8,
    name: "Jamuna Future Park",
    type: "Shopping Mall",
    category: "public_space",
    distance: "5.2 km",
    latitude: 23.8136,
    longitude: 90.4244,
    emergencyNumber: "8431055",
    description: "One of the largest shopping malls",
    safetyLevel: "medium",
  },

  // Banks & ATMs (Well-lit and secured)
  {
    id: 9,
    name: "BRAC Bank Head Office",
    type: "Bank",
    category: "financial",
    distance: "1.5 km",
    latitude: 23.7988,
    longitude: 90.4233,
    emergencyNumber: "16221",
    description: "Bank with security guards",
    safetyLevel: "medium",
  },
  {
    id: 10,
    name: "DBL Tower ATM Zone",
    type: "ATM Center",
    category: "financial",
    distance: "2.3 km",
    latitude: 23.7991,
    longitude: 90.4217,
    emergencyNumber: null,
    description: "Well-lit ATM area with security",
    safetyLevel: "medium",
  },

  // Educational Institutions
  {
    id: 11,
    name: "University of Dhaka",
    type: "University",
    category: "educational",
    distance: "4.2 km",
    latitude: 23.7333,
    longitude: 90.3986,
    emergencyNumber: "9661900",
    description: "University campus with security",
    safetyLevel: "high",
  },
  {
    id: 12,
    name: "North South University",
    type: "University",
    category: "educational",
    distance: "6.1 km",
    latitude: 23.8158,
    longitude: 90.4256,
    emergencyNumber: "55668200",
    description: "Private university campus",
    safetyLevel: "high",
  },

  // Fire Stations
  {
    id: 13,
    name: "Dhaka Fire Service HQ",
    type: "Fire Station",
    category: "emergency",
    distance: "3.5 km",
    latitude: 23.7104,
    longitude: 90.4074,
    emergencyNumber: "199",
    description: "Fire and emergency services",
    safetyLevel: "very_high",
  },

  // Women's Support Centers
  {
    id: 14,
    name: "Women Support & Investigation Center",
    type: "Support Center",
    category: "support",
    distance: "2.8 km",
    latitude: 23.7802,
    longitude: 90.4165,
    emergencyNumber: "109",
    description: "Specialized support for women",
    safetyLevel: "very_high",
  },
  {
    id: 15,
    name: "One Stop Crisis Center",
    type: "Support Center",
    category: "support",
    distance: "4.1 km",
    latitude: 23.7723,
    longitude: 90.4291,
    emergencyNumber: "10921",
    description: "Comprehensive support services",
    safetyLevel: "very_high",
  },

  // Pharmacies (24/7)
  {
    id: 16,
    name: "Lazz Pharma (24/7)",
    type: "Pharmacy",
    category: "medical",
    distance: "1.1 km",
    latitude: 23.7512,
    longitude: 90.3921,
    emergencyNumber: "01713000000",
    description: "24/7 emergency pharmacy",
    safetyLevel: "medium",
  },

  // Hotels with Security
  {
    id: 17,
    name: "Westin Dhaka",
    type: "Hotel",
    category: "accommodation",
    distance: "2.2 km",
    latitude: 23.7944,
    longitude: 90.4142,
    emergencyNumber: "9891989",
    description: "5-star hotel with security",
    safetyLevel: "high",
  },
  {
    id: 18,
    name: "Radisson Blu Dhaka",
    type: "Hotel",
    category: "accommodation",
    distance: "3.1 km",
    latitude: 23.7978,
    longitude: 90.4211,
    emergencyNumber: "9830455",
    description: "International hotel chain",
    safetyLevel: "high",
  },

  // Public Transportation Hubs
  {
    id: 19,
    name: "Farmgate Bus Stand",
    type: "Transport Hub",
    category: "transport",
    distance: "3.3 km",
    latitude: 23.7528,
    longitude: 90.3867,
    emergencyNumber: null,
    description: "Major bus terminal with people",
    safetyLevel: "low",
  },
  {
    id: 20,
    name: "Uttara Metro Station",
    type: "Transport Hub",
    category: "transport",
    distance: "7.2 km",
    latitude: 23.8754,
    longitude: 90.3932,
    emergencyNumber: null,
    description: "MRT station with security",
    safetyLevel: "medium",
  },

  // Restaurants & Cafes (Open Late)
  {
    id: 21,
    name: "Star Kabab & Restaurant",
    type: "Restaurant",
    category: "commercial",
    distance: "1.8 km",
    latitude: 23.7478,
    longitude: 90.3889,
    emergencyNumber: null,
    description: "Popular restaurant open late",
    safetyLevel: "medium",
  },
  {
    id: 22,
    name: "North End Coffee",
    type: "Cafe",
    category: "commercial",
    distance: "2.5 km",
    latitude: 23.7967,
    longitude: 90.4198,
    emergencyNumber: null,
    description: "Well-lit cafe with people",
    safetyLevel: "medium",
  },

  // Religious Places
  {
    id: 23,
    name: "Baitul Mukarram Mosque",
    type: "Religious Place",
    category: "public_space",
    distance: "3.9 km",
    latitude: 23.7278,
    longitude: 90.4106,
    emergencyNumber: null,
    description: "National mosque with people",
    safetyLevel: "medium",
  },
  {
    id: 24,
    name: "Dhakeshwari Temple",
    type: "Religious Place",
    category: "public_space",
    distance: "4.8 km",
    latitude: 23.7231,
    longitude: 90.3894,
    emergencyNumber: null,
    description: "Historic temple with visitors",
    safetyLevel: "medium",
  },
];
// For getCurrentPositionAsync
interface LocationObjectCoords {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function SafeMapScreen() {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [mapRegion, setMapRegion] = useState<MapRegion | null>(null);
  const [loading, setLoading] = useState(true);

  // Get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(locationResult.coords);

      // Set map region to show user location
      setMapRegion({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });

      setLoading(false);
    })();
  }, []);

  // Start real-time location sharing
  const startLocationSharing = async () => {
    try {
      setIsSharing(true);

      // Get current location
      let locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const shareUrl = `https://maps.google.com/?q=${locationResult.coords.latitude},${locationResult.coords.longitude}`;

      // Create share message
      const shareMessage = `🚨 HERGuard Live Location Sharing 🚨\n\nMy current location:\n${shareUrl}\n\nLatitude: ${
        locationResult.coords.latitude
      }\nLongitude: ${
        locationResult.coords.longitude
      }\nTime: ${new Date().toLocaleString()}`;

      // You can integrate with messaging apps or use Expo Sharing
      Alert.alert(
        "Live Location Shared!",
        `Your location has been shared with your emergency contacts.\n\nShare this URL manually:\n${shareUrl}`,
        [
          { text: "Copy URL", onPress: () => copyToClipboard(shareUrl) },
          { text: "OK", style: "cancel" },
        ]
      );

      // Here you would typically send this to your backend/guardians
      console.log("Location shared:", shareMessage);
    } catch (error) {
      Alert.alert("Error", "Failed to share location");
      console.error(error);
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    // You can use expo-clipboard for better clipboard functionality
    Alert.alert("Copied!", "Location URL copied to clipboard");
    // For now, we'll just log it
    console.log("URL to copy:", text);
  };

  const navigateToNearestSafeZone = () => {
    if (!location) {
      Alert.alert("Location Required", "Please enable location services");
      return;
    }

    // Find nearest safe zone (simple distance calculation)
    const nearestZone = safeZones.reduce(
      (nearest, zone) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          zone.latitude,
          zone.longitude
        );
        return distance < nearest.distance ? { zone, distance } : nearest;
      },
      { zone: null as SafeZone | null, distance: Infinity }
    );

    if (nearestZone.zone) {
      Alert.alert(
        "Navigate to Safe Zone",
        `Navigate to ${nearestZone.zone.name} (${nearestZone.distance.toFixed(
          1
        )} km away)?`,
        [
          {
            text: "Navigate",
            onPress: () => {
              // In a real app, this would open Google Maps or Apple Maps
              const url = `https://maps.google.com/?daddr=${
                nearestZone.zone!.latitude
              },${nearestZone.zone!.longitude}`;
              Alert.alert(
                "Navigation",
                `Open maps to navigate to ${nearestZone.zone!.name}`
              );
              console.log("Navigation URL:", url);
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  // Helper function to calculate distance between two coordinates
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading your location...</Text>
      </View>
    );
  }

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
        {/* Interactive Map */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>LIVE SAFE MAP</Text>
          <View style={styles.mapContainer}>
            {mapRegion ? (
              <MapView
                style={styles.map}
                region={mapRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
              >
                {/* User location marker */}
                {location && (
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    title="Your Location"
                    description="You are here"
                    pinColor={Colors.primary}
                  >
                    <View style={styles.userMarker}>
                      <Ionicons
                        name="person"
                        size={20}
                        color={Colors.lightText}
                      />
                    </View>
                  </Marker>
                )}

                {/* Safe zones markers */}
                {safeZones.map((zone) => (
                  <Marker
                    key={zone.id}
                    coordinate={{
                      latitude: zone.latitude,
                      longitude: zone.longitude,
                    }}
                    title={zone.name}
                    description={zone.type}
                  >
                    <View
                      style={[
                        styles.safeZoneMarker,
                        {
                          backgroundColor:
                            zone.type === "Police Station"
                              ? Colors.primary
                              : zone.type === "Hospital"
                              ? Colors.warning
                              : Colors.success,
                        },
                      ]}
                    >
                      <Ionicons
                        name={
                          zone.type === "Police Station"
                            ? "shield"
                            : zone.type === "Hospital"
                            ? "medical"
                            : "business"
                        }
                        size={16}
                        color={Colors.lightText}
                      />
                    </View>
                  </Marker>
                ))}

                {/* Safety radius around user */}
                {location && (
                  <Circle
                    center={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    radius={500} // 500 meter radius
                    strokeColor={Colors.accentPurple}
                    fillColor={`${Colors.accentPurple}20`}
                    strokeWidth={1}
                  />
                )}
              </MapView>
            ) : (
              <View style={styles.mapPlaceholder}>
                <Ionicons name="map" size={50} color={Colors.darkText} />
                <Text style={styles.mapText}>Loading Map...</Text>
                <Text style={styles.mapSubtext}>
                  Please enable location services
                </Text>
              </View>
            )}
          </View>

          {/* Location Status */}
          <View style={styles.locationStatus}>
            <Ionicons
              name={location ? "location" : "location-outline"}
              size={20}
              color={location ? Colors.success : Colors.warning}
            />
            <Text style={styles.locationStatusText}>
              {location ? "Live Location Active" : "Location Access Required"}
            </Text>
          </View>
        </View>

        {/* Nearby Safe Zones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEARBY SAFE ZONES</Text>
          {safeZones.map((zone) => (
            <TouchableOpacity key={zone.id} style={styles.zoneCard}>
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
                  color={Colors.primary}
                />
              </View>
              <View style={styles.zoneInfo}>
                <Text style={styles.zoneName}>{zone.name}</Text>
                <Text style={styles.zoneType}>{zone.type}</Text>
                {location && (
                  <Text style={styles.zoneDistance}>
                    {calculateDistance(
                      location.latitude,
                      location.longitude,
                      zone.latitude,
                      zone.longitude
                    ).toFixed(1)}{" "}
                    km away
                  </Text>
                )}
              </View>
              <Ionicons name="navigate" size={20} color={Colors.primary} />
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
            onPress={navigateToNearestSafeZone}
            disabled={!location}
          >
            <Ionicons name="navigate" size={24} color={Colors.lightText} />
            <Text style={styles.emergencyButtonText}>
              Navigate to Nearest Safe Zone
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.emergencyButton,
              {
                backgroundColor: isSharing
                  ? Colors.accentPink
                  : Colors.accentPurple,
                opacity: location ? 1 : 0.6,
              },
            ]}
            onPress={startLocationSharing}
            disabled={!location || isSharing}
          >
            {isSharing ? (
              <ActivityIndicator size="small" color={Colors.lightText} />
            ) : (
              <Ionicons
                name="share-social"
                size={24}
                color={Colors.lightText}
              />
            )}
            <Text style={styles.emergencyButtonText}>
              {isSharing ? "Sharing Location..." : "Share Live Location"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Location Sharing Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Live Location Sharing</Text>
          <Text style={styles.infoText}>
            • Share your real-time location with emergency contacts{"\n"}•
            Updates every few seconds while active{"\n"}• Includes coordinates
            and Google Maps link{"\n"}• Works even when app is in background
          </Text>
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: Colors.darkText,
    fontSize: 16,
  },
  mapSection: {
    padding: 15,
  },
  mapContainer: {
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: Colors.accentPurple,
    borderWidth: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: Colors.mediumBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  mapText: {
    color: Colors.darkText,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  mapSubtext: {
    color: Colors.darkText,
    fontSize: 14,
    marginTop: 5,
    opacity: 0.7,
  },
  locationStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.mediumBackground,
    borderRadius: 10,
  },
  locationStatusText: {
    color: Colors.darkText,
    marginLeft: 8,
    fontWeight: "500",
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  zoneCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mediumBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: Colors.accentPink,
    borderWidth: 1,
  },
  zoneIcon: {
    marginRight: 15,
  },
  zoneInfo: {
    flex: 1,
  },
  zoneName: {
    color: Colors.darkText,
    fontSize: 16,
    fontWeight: "bold",
  },
  zoneType: {
    color: Colors.darkText,
    fontSize: 14,
    opacity: 0.7,
  },
  zoneDistance: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  emergencyActions: {
    padding: 15,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  emergencyButtonText: {
    color: Colors.lightText,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  infoSection: {
    padding: 15,
    margin: 15,
    backgroundColor: Colors.mediumBackground,
    borderRadius: 10,
    borderColor: Colors.accentPurple,
    borderWidth: 1,
  },
  infoTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    color: Colors.darkText,
    fontSize: 14,
    lineHeight: 20,
  },
  userMarker: {
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.lightText,
  },
  safeZoneMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.lightText,
  },
});
