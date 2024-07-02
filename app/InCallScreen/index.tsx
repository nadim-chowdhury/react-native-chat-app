import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RTCView, mediaDevices, MediaStream } from "react-native-webrtc";

interface InCallScreenProps {
  route: {
    params: {
      phoneNumber: string;
      callerName: string;
    };
  };
  navigation: any;
}

const InCallScreen: React.FC<InCallScreenProps> = ({ route, navigation }) => {
  const { phoneNumber, callerName } = route.params;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getMediaStream();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const handleHangUp = () => {
    localStream?.getTracks().forEach((track) => track.stop());
    console.log("Call ended");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.remoteView}>
        {isVideoEnabled && localStream && (
          <RTCView streamURL={localStream.toURL()} style={styles.video} />
        )}
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
