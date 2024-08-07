import React, { useContext, useState } from "react";
import AuthContext from "../context/auth";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../queries/addPost";
import * as ImagePicker from "expo-image-picker";

export default function AddPostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { userId } = useContext(AuthContext);
  const [addPost, { loading, error, data }] = useMutation(ADD_POST, {
    onCompleted: async (mutationResult) => {
      // Clear input fields after posting
      setContent("");
      setImgUrl("");
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access media library was denied");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result,"ini result")

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const fileType = localUri.split('.').pop();

      const uploadData = new FormData();
      uploadData.append('file', {
        uri: localUri,
        type: `image/${fileType}`,
        name: `upload.${fileType}`
      });
      uploadData.append('upload_preset', 'Mobile_LinkedIn'); // Replace 'your_upload_preset' with your Cloudinary upload preset.

      const response = await fetch("https://api.cloudinary.com/v1_1/dg3xgdrc1/image/upload", { // Replace 'your_cloud_name' with your Cloudinary cloud name.
        method: 'POST',
        body: uploadData
      });


      const data = await response.json();
      setImgUrl(data.secure_url);
    }


  };

  const handleSubmit = () => {
    addPost({
      variables: {
        newPost: {
          content,
          imgUrl,
          authorId: userId,
        },
      },
    });
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Enter your post content" value={content} onChangeText={setContent} multiline />
        <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Add Image</Text>
        </TouchableOpacity>
        {imgUrl ? <Image source={{ uri: imgUrl }} style={styles.image} /> : null}
        {loading ? <Text>Loading...</Text> : <Button title="Post" onPress={handleSubmit} disabled={content.trim().length === 0} />}
        {error && <Text>Error: {error.message}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  imagePicker: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  imagePickerText: {
    color: "blue",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
