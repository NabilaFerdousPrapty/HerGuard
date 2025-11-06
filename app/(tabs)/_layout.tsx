import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

// Define the new color palette for a light theme (repeat for each file that uses it)
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

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary, // Active tab is primary purple
        tabBarInactiveTintColor: Colors.darkText, // Inactive tab is dark text
        tabBarStyle: {
          backgroundColor: Colors.mediumBackground, // Light background for tab bar
          borderTopColor: Colors.accentPink, // Subtle border color
          borderTopWidth: 1, // Add border to match card-like style
          height: Platform.OS === "ios" ? 85 : 60,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
        },
        headerStyle: {
          backgroundColor: Colors.lightBackground, // Header matches main background
        },
        headerTintColor: Colors.darkText, // Header text is dark
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HERGuard",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="safemap"
        options={{
          title: "Safe Map",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="guardians"
        options={{
          title: "Guardians",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="legal"
        options={{
          title: "Legal Rights",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
