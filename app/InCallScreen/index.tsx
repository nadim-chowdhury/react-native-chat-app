import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RTCView, mediaDevices } from "react-native-webrtc"; // Assuming WebRTC is used

const InCallScreen = ({ route, navigation }) => {
  const { phoneNumber, callerName } = route.params;
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Implement logic to toggle audio
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // Implement logic to toggle video
  };

  const handleHangUp = () => {
    // Implement logic to hang up the call
    console.log("Call ended");
    // Navigate back to previous screen (or wherever needed)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.remoteView}>
        {/* Display remote video stream (if video call) */}
        {isVideoEnabled && <RTCView streamURL={null} style={styles.video} />}
        {/* Display remote audio stream (if audio call) */}
        {!isVideoEnabled && (
          <Text style={styles.audioOnlyText}>Audio Call</Text>
        )}
      </View>
      <View style={styles.controls}>
        <Button
          title={isAudioEnabled ? "Mute" : "Unmute"}
          onPress={toggleAudio}
        />
        <Button
          title={isVideoEnabled ? "Disable Video" : "Enable Video"}
          onPress={toggleVideo}
        />
        <Button title="Hang Up" onPress={handleHangUp} />
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
  remoteView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  audioOnlyText: {
    fontSize: 20,
    color: "#fff",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
});

export default InCallScreen;
