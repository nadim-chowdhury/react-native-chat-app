import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// if (!(firebase as any).apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   (firebase as any)
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((userCredential: any) => {
  //       const user = userCredential.user;
  //       console.log("Logged in:", user.uid);
  //     })
  //     .catch((error: any) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error("Login error:", errorMessage);
  //     });
  // };

  // const handleLogout = () => {
  //   (firebase as any)
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       console.log("Logged out");
  //     })
  //     .catch((error: any) => {
  //       console.error("Logout error:", error);
  //     });
  // };

  // const signInWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const googleCredential = (
  //       firebase as any
  //     ).auth.GoogleAuthProvider.credential(userInfo.idToken);
  //     const userCredential = await (firebase as any)
  //       .auth()
  //       .signInWithCredential(googleCredential);
  //     console.log("Signed in with Google:", userCredential.user);
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.error("Google sign in cancelled");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.error("Google sign in in progress");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.error("Google play services not available or outdated");
  //     } else {
  //       console.error("Google sign in error:", error);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* <Button title="Login" onPress={handleLogin} />
      <Button title="Logout" onPress={handleLogout} />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default AuthScreen;
