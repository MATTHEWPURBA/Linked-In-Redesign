import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Overview", headerShown: false }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: "Detail",
          headerStyle: { backgroundColor: "skyblue" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

// Ini Navigasi yang pake StackNavigation
// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button title="Go To Details" onPress={() => navigation.navigate("Details")} />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Button title="Go Back" onPress={() => navigation.goBack()} />
//       <Button title="Go to Other Details" onPress={() => navigation.navigate()} />
//     </View>
//   );
// }
// Ini Navigasi yang pake StackNavigation

{
  // ini tuh navigasi sistem StackNavigator //
  /* <Stack.Navigator>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={({ route }) => ({
      title: "Overview",
      headerShown: false,
      // yang buat nama Home di atas kiri adalah Stack Navigator ini 
    })}
  />
  <Stack.Screen
    name="Details"
    component={DetailsScreen}
    options={({ route }) => ({
      title: "Detail",
      headerStyle: {
        backgroundColor: "skyblue",
      },
      headerTintColor: "white",
    })}
  />
</Stack.Navigator> */
  // ini tuh navigasi sistem StackNavigator //
}
