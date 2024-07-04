// component/PostCard.js

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function PostCard({ content, imgUrl, author, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 16 }}>
        <Image source={{ uri: imgUrl }} style={{ width: "100%", height: 200 }} />
        <Text>{content}</Text>
        {/* <Text>{author.name}</Text> */}
        {/* <Text>@{author.username}</Text> */}
      </View>
    </TouchableOpacity>
  );
}
