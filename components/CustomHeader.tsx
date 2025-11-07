// CustomHeader.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomHeaderProps {
  title?: string;
  navigation: any; // Required for drawer
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Logo */}
      <Image
        source={require("../assets/images/her-guard.png")} // Use require()
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Drawer Menu */}
      <TouchableOpacity>
        <Ionicons name="menu" size={30} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Logo left, drawer right
    height: 90,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomHeader;
