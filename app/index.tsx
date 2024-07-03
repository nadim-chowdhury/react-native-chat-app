import React, { useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    setLoggedIn(true);
  };

  const handleHome = () => {
    // Add your navigation to home logic here
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/logo.png")} style={styles.logo} /> */}
      <Text style={styles.title}>Welcome to ChatApp</Text>
      {/* <Image
        source={require("../assets/description.png")}
        style={styles.descriptionImage}
      /> */}
      <Text style={styles.description}>
        ChatApp is a revolutionary chat application that lets you connect with
        friends and family instantly. Enjoy seamless communication with our
        user-friendly interface.
      </Text>
      <Button
        title={loggedIn ? "Home" : "Login"}
        onPress={loggedIn ? handleHome : handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  descriptionImage: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
