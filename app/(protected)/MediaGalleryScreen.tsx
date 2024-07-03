import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/storage";

const MediaGalleryScreen = () => {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    // Load media from Firebase Storage (replace with your logic)
    const storageRef = firebase.storage().ref("media");
    storageRef
      .listAll()
      .then((res) => {
        const urls = res.items.map((item) => item.getDownloadURL());
        Promise.all(urls)
          .then((downloadUrls) => {
            setMediaList(downloadUrls);
          })
          .catch((error) => {
            console.error("Error fetching download URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing media:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mediaItem}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  mediaItem: {
    flex: 1,
    margin: 5,
    aspectRatio: 1, // Square aspect ratio
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
});

export default MediaGalleryScreen;
