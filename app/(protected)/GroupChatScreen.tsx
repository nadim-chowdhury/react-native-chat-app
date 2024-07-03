import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";

const GroupChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    // Load initial group data (replace with actual logic to fetch group details)
    const unsubscribe = firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .onSnapshot((snapshot) => {
        const groupData = snapshot.data();
        if (groupData) {
          setGroupName(groupData.name);
          setGroupMembers(groupData.members);
        }
      });

    // Load messages (replace with actual logic to load messages for the group)
    const messagesRef = firebase
      .firestore()
      .collection("group_messages")
      .doc(groupId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(50); // Adjust limit as per your app's needs

    const unsubscribeMessages = messagesRef.onSnapshot((snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray.reverse());
    });

    return () => {
      unsubscribe();
      unsubscribeMessages();
    };
  }, [groupId]);

  const handleSend = () => {
    // Replace with actual logic to send message to group
    firebase
      .firestore()
      .collection("group_messages")
      .doc(groupId)
      .collection("messages")
      .add({
        text: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        senderId: firebase.auth().currentUser.uid,
        senderName: firebase.auth().currentUser.displayName,
      })
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleLeaveGroup = () => {
    // Replace with actual logic to leave group
    // Example: update user's groups list and remove user from group members
    console.log("Leave group functionality");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.groupName}>{groupName}</Text>
      <FlatList
        inverted
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>
              {item.senderName}: {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
      <Button title="Leave Group" onPress={handleLeaveGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    backgroundColor: "#eee",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default GroupChatScreen;
