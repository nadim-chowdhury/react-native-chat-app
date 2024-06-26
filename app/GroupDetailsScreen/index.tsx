import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";

const GroupDetailsScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Load group details (replace with your logic)
    const groupRef = firebase.firestore().collection("groups").doc(groupId);

    groupRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setGroupDetails(doc.data());
          // Fetch members' details
          const memberIds = doc.data().members;
          const membersPromises = memberIds.map((memberId) =>
            firebase.firestore().collection("users").doc(memberId).get()
          );
          Promise.all(membersPromises)
            .then((docs) => {
              const membersData = docs.map((doc) => doc.data());
              setMembers(membersData);
            })
            .catch((error) => {
              console.error("Error fetching members:", error);
            });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });

    return () => groupRef();
  }, [groupId]);

  const handleAddMember = () => {
    // Implement logic to add member to the group
    Alert.alert("Add Member", "Implement logic to add member here");
  };

  const handleRemoveMember = (memberId) => {
    // Implement logic to remove member from the group
    Alert.alert("Remove Member", "Implement logic to remove member here");
  };

  return (
    <View style={styles.container}>
      {groupDetails && (
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{groupDetails.name}</Text>
          <Text>{members.length} members</Text>
        </View>
      )}
      <FlatList
        data={members}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text>{item.displayName}</Text>
            {/* Implement UI for admin actions (e.g., remove member) */}
            <TouchableOpacity onPress={() => handleRemoveMember(item.uid)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Implement UI for adding members */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
        <Text style={styles.addButtonText}>Add Member</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  groupInfo: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  memberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  removeButton: {
    color: "red",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default GroupDetailsScreen;
