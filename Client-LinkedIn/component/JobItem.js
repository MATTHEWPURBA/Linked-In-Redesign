import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const JobItem = ({ content, imgUrl, author }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: author.profilePicture }} style={styles.profileImage} />
          <View style={styles.headerText}>
            <Text style={styles.authorName}>{author.name}</Text>
            <Text style={styles.authorInfo}>@{author.username}</Text>
          </View>
        </View>
        {content ? <Text style={styles.content}>{content}</Text> : null}
        {imgUrl ? <Image source={{ uri: imgUrl }} style={styles.postImage} /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // Add space between the header and each post
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: width - 40, // Ensure it fits the screen with padding
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  authorInfo: {
    fontSize: 14,
    color: "grey",
  },
  content: {
    fontSize: 14,
    padding: 15,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});

export default JobItem;
