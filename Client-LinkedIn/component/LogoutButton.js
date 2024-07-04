import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import AuthContext from "../context/auth";
import * as SecureStore from "expo-secure-store";

export default function LogoutButton() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    const response = await SecureStore.deleteItemAsync("accessToken");
    console.log(response, "ini response");
    auth.setSignedIn(false);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    padding: 10,
    backgroundColor: "#0077b5",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
