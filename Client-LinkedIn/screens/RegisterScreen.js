// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const MUTATION_REGISTER = gql`
  mutation Mutation($registerUser: Register) {
  register(registerUser: $registerUser) {
    _id
    name
    email
    username
    password
  }
}
`;

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { loading, error }] = useMutation(MUTATION_REGISTER, {
    onCompleted: () => {
      Alert.alert("Registration successful", "You can now login with your credentials.");
      navigation.navigate("Login");
      resetForm();
    },
 
  });

  const resetForm = () => {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const handleRegister = () => {
    if (!name || !email || !username || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }
    registerUser({
      variables: {
        registerUser: { name, email, username, password },
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} placeholderTextColor="#bbb" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="#bbb" />
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} placeholderTextColor="#bbb" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="#bbb" />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.error}>Error: {error.message}</Text>}
      </View>
    </TouchableWithoutFeedback>
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
