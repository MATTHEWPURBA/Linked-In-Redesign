import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { GET_USER_PROFILE } from "../queries/getUserProfile";
import PostCard from "./PostCard";
import { useQuery } from "@apollo/client";

export default function UserProfile({ route, navigation }) {
  const { userId } = route.params;
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { findUserByIdId: userId },
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data.findUserById;

  //   console.log(user, "ini user");
  //   console.log(user.name, "ini user name");
  //   console.log(user.username, "ini user username");
  //   console.log(user.email, "ini user email");
  //   console.log(user.posts, "ini user email");

  //   console.log(data, "ini ini data");

  console.log(navigation, "ini navigation");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        {/* <Image source={{ uri: user.profilePicture }} style={{ width: 100, height: 100, borderRadius: 50 }} /> */}
        <Text>@{user.name}</Text>
        <Text>@{user.username}</Text>
      </View>

      <FlatList data={user.posts} keyExtractor={(item) => item._id} renderItem={({ item }) => <PostCard content={item.content} imgUrl={item.imgUrl} author={item.author} />} />

      <TouchableOpacity style={{ marginTop: 20, backgroundColor: "blue", padding: 10, borderRadius: 5 }} onPress={() => navigation.navigate("HomeStack")}>
        <Text style={{ color: "white", textAlign: "center" }}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
