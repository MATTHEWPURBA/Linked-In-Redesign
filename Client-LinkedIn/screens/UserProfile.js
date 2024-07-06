import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { GET_USER_PROFILE } from "../queries/getUserProfile";
import AuthContext from "../context/auth";

export default function UserProfile({ navigation }) {
  const { userId } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { findUserByIdId: userId },
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data.findUserById;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.bio}>Bio goes here...</Text>
      {user.posts.map((post) => (
        <TouchableOpacity key={post._id} style={styles.post} onPress={() => navigation.navigate("PostDetail", { postId: post._id })}>
          <Text>{post.content}</Text>
          {post.imgUrl && <Image source={{ uri: post.imgUrl }} style={styles.postImage} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    color: "gray",
  },
  email: {
    fontSize: 18,
    color: "gray",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  post: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "100%",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
});
