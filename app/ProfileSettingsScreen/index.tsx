import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

const ProfileSettingsScreen = () => {
  const [displayName, setDisplayName] = useState(
    firebase.auth().currentUser.displayName || ""
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = () => {
    setIsUpdating(true);
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: displayName.trim(),
      })
      .then(() => {
        setIsUpdating(false);
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        setIsUpdating(false);
        console.error("Error updating profile:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Display Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdateProfile}
        disabled={isUpdating}
      >
        <Text style={styles.buttonText}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ProfileSettingsScreen;
