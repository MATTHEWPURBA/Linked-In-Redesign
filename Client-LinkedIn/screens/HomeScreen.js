import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text, Button, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { GET_ALLPOST } from "../queries/getAllPost";
import JobItem from "../component/JobItem";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_ALLPOST);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  // Filter the posts to remove any without author.name or author.username
  const validPosts = data.findAllPost.filter((post) => post.author && post.author.name && post.author.username);

  console.log(data, "data nih");
  console.log(data.findAllPost, "findallPost nih");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={validPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: item.author._id })}>
            <JobItem content={item.content} imgUrl={item.imgUrl} author={item.author} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
