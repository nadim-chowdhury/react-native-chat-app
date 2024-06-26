import React, { useState } from "react";
import { View, Button, Image, TextInput, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/storage";

const MediaScreen = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChoosePhoto = async () => {
    // Example: image picker library or camera integration
    // Replace with actual implementation
    // For simplicity, let's assume 'file' is set when image is chosen.
    const imageUri = ""; // Replace with actual image URI
    setFile(imageUri);
  };

  const handleUploadPhoto = async () => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`images/${file.name}`);

    const uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      {file && <Image source={{ uri: file }} style={styles.imagePreview} />}
      {file && <Button title="Upload Photo" onPress={handleUploadPhoto} />}
      {uploadProgress > 0 && <Text>Uploading: {uploadProgress}%</Text>}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.uploadedImage} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 10,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default MediaScreen;
