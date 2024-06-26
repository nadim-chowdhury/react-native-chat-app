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

const GroupListScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Load user's groups from Firebase Firestore (replace with your logic)
    const userId = firebase.auth().currentUser.uid;
    const groupsRef = firebase
      .firestore()
      .collection("groups")
      .where("members", "array-contains", userId);

    groupsRef.onSnapshot((snapshot) => {
      const groupsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupsArray);
    });

    return () => groupsRef();
  }, []);

  const navigateToGroupDetails = (groupId) => {
    navigation.navigate("GroupDetails", { groupId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() => navigateToGroupDetails(item.id)}
          >
            <Text style={styles.groupName}>{item.name}</Text>
            <Text>{item.members.length} members</Text>
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
  groupItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GroupListScreen;
