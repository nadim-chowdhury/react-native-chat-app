import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const IncomingCallScreen = ({ route, navigation }) => {
  const { callerName } = route.params;

  const handleAccept = () => {
    // Implement logic to accept the call
    console.log("Accepted call from:", callerName);
    // Navigate to in-call screen
    navigation.navigate("InCall", { callerName });
  };

  const handleReject = () => {
    // Implement logic to reject the call
    console.log("Rejected call from:", callerName);
    // Navigate back to previous screen (or wherever needed)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callerText}>{callerName} is calling...</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={handleAccept} />
        <Button title="Reject" onPress={handleReject} />
      </View>
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
  callerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default IncomingCallScreen;
