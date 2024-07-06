// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/ApolloConnection";
import * as SecureStore from "expo-secure-store";
import AuthContext from "./context/auth"; // Adjust the import path as per your project structure
import { jwtDecode } from "jwt-decode";

export default function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          if (decodedToken && decodedToken._id) {
            setSignedIn(true);
            setUserId(decodedToken._id);
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ isSignedIn, setSignedIn, userId, setUserId }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
