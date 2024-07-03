import React, { useEffect, useState } from "react";
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
import "firebase/auth";

type Message = {
  id: string;
  text: string;
  createdAt: firebase.firestore.Timestamp;
  senderId: string;
  senderName: string;
};

type IndividualChatScreenProps = {
  route: {
    params: {
      chatId: string;
    };
  };
};

const IndividualChatScreen: React.FC<IndividualChatScreenProps> = ({
  route,
}) => {
  const { chatId } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const messagesRef = firebase
      .firestore()
      .collection("individual_chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(50);

    const unsubscribe = messagesRef.onSnapshot((snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(messagesArray.reverse());
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = () => {
    if (!message.trim()) return;

    firebase
      .firestore()
      .collection("individual_chats")
      .doc(chatId)
      .collection("messages")
      .add({
        text: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        senderId: firebase.auth().currentUser?.uid,
        senderName: firebase.auth().currentUser?.displayName,
      })
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
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

export default IndividualChatScreen;
