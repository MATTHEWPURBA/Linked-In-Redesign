// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { ApolloProvider } from "@apollo/client";
import client from "./config/ApolloConnection";

export default function App() {
  return (
    <ApolloProvider client={client}>
      {/* import client dan link server dsini */}
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
