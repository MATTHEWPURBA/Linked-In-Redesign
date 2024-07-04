import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("accessToken")
      // use effect ini digunakan kayanya
      // sebagai pengingat, dan store accessToken,
      // even tho app closed
      .then((result) => {
        if (result) {
          setSignedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setSignedIn,
      }}
      //nah disini bisa diatur nih untuk auth nya apakah
      // true or false si isSignedIn nya
    >
      <Stack.Navigator
        screenOptions={{
          headerTitle: "LinkedIn", // Set the header title to the name of the app
          headerStyle: {
            backgroundColor: "#0077b5",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {!isSignedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => <AntDesign name="home" color={focused ? "dodgerblue" : "grey"} size={size} />,
          headerShown: false,
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ focused, color, size }) => <AntDesign name="user" color={focused ? "blue" : "grey"} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
