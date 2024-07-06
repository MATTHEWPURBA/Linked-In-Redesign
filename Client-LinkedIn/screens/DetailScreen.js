import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { GET_POSTDETAIL } from "../queries/getPostDetail";

export default function DetailsScreen({ route }) {
  const { postId } = route.params;
  const { loading, error, data, refetch } = useQuery(GET_POSTDETAIL, {
    variables: { findPostByIdId: postId },
  });

  useEffect(() => {
    refetch();
  }, [postId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const post = data.findPostById;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.content}</Text>
      {post.imgUrl && <Image source={{ uri: post.imgUrl }} style={styles.image} />}
      <Text style={styles.author}>By: {post.author.name}</Text>
      <Text style={styles.date}>Posted on: {new Date(post.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.sectionTitle}>Comments:</Text>
      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.createdAt}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentUsername}>{item.username}</Text>
            <Text>{item.content}</Text>
            <Text style={styles.commentDate}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 400,
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "grey",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 12,
    color: "grey",
  },
});
