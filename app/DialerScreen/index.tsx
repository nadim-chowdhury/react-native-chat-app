import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const DialerScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCall = () => {
    // Implement logic to initiate a call
    console.log("Calling number:", phoneNumber);
    // Navigate to in-call screen
    navigation.navigate("InCall", { phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Call" onPress={handleCall} />
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

export default DialerScreen;
