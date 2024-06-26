import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

const AccountSettingsScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleChangePassword = () => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Reauthenticate user before changing password
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // Password change successful
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("Password updated successfully");
          })
          .catch((error) => {
            console.error("Error updating password:", error);
          });
      })
      .catch((error) => {
        console.error("Error reauthenticating user:", error);
      });
  };

  const handleUpdateProfile = () => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: displayName,
      })
      .then(() => {
        console.log("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Change Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      <Button title="Change Password" onPress={handleChangePassword} />

      <Text style={[styles.label, { marginTop: 20 }]}>Update Profile:</Text>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
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
});

export default AccountSettingsScreen;
