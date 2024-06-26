import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker"; // Assuming Expo is used

const FileManagerScreen = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Load files (replace with your logic to fetch files)
    // Example: Fetch files from server or use DocumentPicker
  }, []);

  const handlePickFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      console.log("Picked file:", file);
      // Implement logic to upload file (e.g., to Firebase Storage)
      // Update files state with the newly uploaded file
      setFiles([...files, file]);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePickFile}>
        <Text style={styles.buttonText}>Pick a File</Text>
      </TouchableOpacity>
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <Text>{item.name}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Size: {item.size} bytes</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  fileItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default FileManagerScreen;
