import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SettingsScreen = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    // Save user preference (e.g., in AsyncStorage or Firebase)
  };

  const toggleNotifications = () => {
    setNotificationEnabled(!notificationEnabled);
    // Save user preference (e.g., in AsyncStorage or Firebase)
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
      <View style={styles.settingItem}>
        <Text>Notifications</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      {/* Add more settings items as needed */}
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default SettingsScreen;
