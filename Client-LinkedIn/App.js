// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/ApolloConnection";
import HomeStack from "./navigation/TabNavigator";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
