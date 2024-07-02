import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

// Define the type for the navigation stack
type RootStackParamList = {
  InCall: { callerName: string };
  IncomingCall: { callerName: string };
};

// Define the props for the screen
type IncomingCallScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "IncomingCall"
>;
type IncomingCallScreenRouteProp = RouteProp<
  RootStackParamList,
  "IncomingCall"
>;

type IncomingCallScreenProps = {
  navigation: IncomingCallScreenNavigationProp;
  route: IncomingCallScreenRouteProp;
};

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({
  route,
  navigation,
}) => {
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
