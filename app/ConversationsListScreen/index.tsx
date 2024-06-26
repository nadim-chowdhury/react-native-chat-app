import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";

const ConversationsListScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Load conversations list (replace with actual logic to fetch user's chats)
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("chats")
      .onSnapshot((snapshot) => {
        const chatsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConversations(chatsArray);
      });

    return () => unsubscribe();
  }, []);

  const navigateToChat = (chatId, isGroupChat) => {
    if (isGroupChat) {
      navigation.navigate("GroupChat", { chatId });
    } else {
      navigation.navigate("IndividualChat", { chatId });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigateToChat(item.id, item.isGroupChat)}
          >
            <Text style={styles.chatTitle}>{item.chatName}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
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
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#666",
  },
});

export default ConversationsListScreen;
