// TabNavigator.js
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddPostScreen from "../screens/AddPostScreen";
import UserProfile from "../screens/UserProfile";
import DetailsScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import AuthContext from "../context/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
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
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true, title: "Home" }} />
          <Stack.Screen name="AddPost" component={AddPostScreen} options={{ title: "Add Post" }} />
          <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: "Profile" }} />
          <Stack.Screen name="PostDetail" component={DetailsScreen} options={{ title: "Post Detail" }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Tab.Navigator>
      {isSignedIn ? (
        <>
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
            name="AddPostStack"
            component={AddPostScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => <AntDesign name="pluscircleo" color={focused ? "blue" : "grey"} size={size} />,
              headerShown: false,
              title: "Add Post",
            }}
          />
          <Tab.Screen
            name="UserProfileStack"
            component={UserProfile}
            options={{
              tabBarIcon: ({ focused, color, size }) => <AntDesign name="user" color={focused ? "blue" : "grey"} size={size} />,
              headerShown: false,
              title: "Profile",
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => <AntDesign name="login" color={focused ? "dodgerblue" : "grey"} size={size} />,
            headerShown: false,
            title: "Login",
          }}
        />
      )}
    </Tab.Navigator>
  );
}
