import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/messaging";

const NotificationsScreen = () => {
  useEffect(() => {
    // Initialize Firebase (replace with your Firebase project config)
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Get permission for receiving notifications (optional for Android)
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        console.log("Permission granted");
        return messaging.getToken();
      })
      .then((token) => {
        console.log("FCM Token:", token);
        // Save the token to your server for sending notifications
      })
      .catch((error) => {
        console.error("Permission denied:", error);
      });

    // Handle incoming notifications
    messaging.onMessage((payload) => {
      console.log("Notification received:", payload);
      // Handle notification display (e.g., using local notifications)
    });

    return () => {
      // Clean up subscriptions
      messaging.onMessage();
    };
  }, []);

  const handleSendNotification = () => {
    // Replace with actual logic to send a notification to users or a group
    const message = {
      notification: {
        title: "New Message",
        body: "You have a new message!",
      },
      // Optionally include data to handle in your app
      data: {
        // Custom data
      },
      // Specify the recipient(s)
      token: "DEVICE_FCM_TOKEN_HERE", // Replace with recipient's FCM token
    };

    // Send the message
    firebase
      .messaging()
      .send(message)
      .then(() => {
        console.log("Notification sent successfully");
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={handleSendNotification} />
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
});

export default NotificationsScreen;
