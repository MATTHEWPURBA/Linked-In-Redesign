import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";
import AddPostScreen from "../screens/AddPostScreen";
import { jwtDecode } from "jwt-decode";
import DetailsScreen from "../screens/DetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync("accessToken")
      // use effect ini digunakan kayanya
      // sebagai pengingat, dan store accessToken,
      // even tho app closed
      .then((result) => {
        if (result) {
          setSignedIn(true);
          // Decode the token to get userId and set it
          // Assuming you have a function decodeToken to decode the JWT and get userId
          const decodeToken = jwtDecode(result);
          const userId = decodeToken._id;
          setUserId(userId);
          //setUserId tuh untuk set UserId
          //saat user berhasil Login
          console.log(userId, "ini user id");
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
        userId,
        setUserId,
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
            <Stack.Screen name="PostDetail" component={DetailsScreen} />
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
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => <AntDesign name="pluscircleo" color={focused ? "blue" : "grey"} size={size} />,
          title: "Add Post",
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
