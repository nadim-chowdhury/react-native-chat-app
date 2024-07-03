import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   (firebase as any)
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((userCredential: any) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log("User logged in:", user.uid);
  //       // Navigate to chat screen or another screen after successful login
  //     })
  //     .catch((error: any) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error("Login error:", errorCode, errorMessage);
  //       // Handle errors (e.g., display error message to user)
  //     });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* <Button title="Login" onPress={handleLogin} /> */}
      <Button
        title="Create an account"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Forgot password?"
        onPress={() => navigation.navigate("ForgotPassword")}
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

export default LoginScreen;
