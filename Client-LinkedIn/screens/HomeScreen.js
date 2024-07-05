import { useQuery } from "@apollo/client";
import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Button } from "react-native";
import { GET_ALLPOST } from "../queries/getAllPost";
import JobItem from "../component/JobItem";
import { useIsFocused } from "@react-navigation/native";
import AuthContext from "../context/auth";
import LogoutButton from "../component/LogoutButton";

export default function HomeScreen({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_ALLPOST);
  const isFocused = useIsFocused();
  const { setSignedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  // Filter the posts to remove any without author.name or author.username
  const validPosts = data.findAllPost.filter((post) => post.author && post.author.name && post.author.username).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <View style={styles.container}>
      <FlatList
        data={validPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { postId: item._id })}>
            <JobItem content={item.content} imgUrl={item.imgUrl} author={item.author} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
