// screens/LoginScreen.js
import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../queries/loginUser";
import { gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/auth";
import { jwtDecode } from "jwt-decode";

const MUTATION_LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      # semua variabel yang brhubungan sam GraphQL
      token
      email
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("kereen@gmail.com");
  const [password, setPassword] = useState("pantat");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [loginUser, { loading, error, data }] = useMutation(MUTATION_LOGIN, {
    onCompleted: async (mutationResult) => {
      //mutation result isi nya si data itu
      // Save the token to local storage or state management
      // Navigate to the Home screen
      // navigation.navigate("Home");
      if (mutationResult?.login?.token) {
        await SecureStore.setItemAsync("accessToken", mutationResult?.login?.token);
        const decodedToken = jwtDecode(mutationResult.login.token);
        // kegiatan simpan token
        auth.setSignedIn(true); // operan dari tabNavigator bisa di manipulasi disini
        auth.setUserId(decodedToken._id);
      }
    },
  });

  const handleLogin = () => {
    loginUser({ variables: { email, password } });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Linked<Text style={styles.titleHighlight}>In</Text>
      </Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="#bbb" />
      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry={!isPasswordVisible} value={password} onChangeText={setPassword} placeholderTextColor="#bbb" />
        <TouchableOpacity style={styles.visibilityButton} onPress={togglePasswordVisibility}>
          <Text style={styles.visibilityButtonText}>{isPasswordVisible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>Error: {error.message}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#282c34",
  },
  title: {
    fontSize: 40,
    marginBottom: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  titleHighlight: {
    backgroundColor: "#0077b5",
    color: "#282c34",
    paddingHorizontal: 12,
    borderRadius: 15,
    marginLeft: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#61dafb",
    borderRadius: 10,
    backgroundColor: "#3a3f47",
    color: "#fff",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: "#61dafb",
    borderRadius: 10,
    backgroundColor: "#3a3f47",
    color: "#fff",
  },
  visibilityButton: {
    padding: 10,
  },
  visibilityButtonText: {
    color: "#61dafb",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#0077b5",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
