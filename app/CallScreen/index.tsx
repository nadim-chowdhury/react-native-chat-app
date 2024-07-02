import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
} from "react-native-webrtc";
import firebase from "firebase/app";
import "firebase/database";
import { firebaseConfig } from "@/utils/firebaseConfig";

const CallScreen: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [callState, setCallState] = useState("");

  let localPC: RTCPeerConnection;
  let remotePC: RTCPeerConnection;

  useEffect(() => {
    // Initialize Firebase (replace with your Firebase project config)

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Initialize peer connection objects
    localPC = new RTCPeerConnection();
    remotePC = new RTCPeerConnection();

    // Set up event handlers for the peer connection
    localPC.onicecandidate = (event) => {
      if (event.candidate) {
        remotePC.addIceCandidate(new RTCIceCandidate(event.candidate));
      }
    };

    localPC.onaddstream = (event: any) => {
      setRemoteStream(event.stream);
    };

    remotePC.onicecandidate = (event) => {
      if (event.candidate) {
        localPC.addIceCandidate(new RTCIceCandidate(event.candidate));
      }
    };

    remotePC.onaddstream = (event: any) => {
      setRemoteStream(event.stream);
    };

    // Clean up on unmount
    return () => {
      localPC.close();
      remotePC.close();
    };
  }, []);

  const startCall = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      if (stream) {
        setLocalStream(stream);
        localPC.addStream(stream);

        // Create offer
        const offer = await localPC.createOffer();
        await localPC.setLocalDescription(new RTCSessionDescription(offer));
        await remotePC.setRemoteDescription(new RTCSessionDescription(offer));

        // Create answer
        const answer = await remotePC.createAnswer();
        await remotePC.setLocalDescription(new RTCSessionDescription(answer));
        await localPC.setRemoteDescription(new RTCSessionDescription(answer));
        setIsCalling(true);
        setCallStarted(true);
        setCallState("Calling...");
      }
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const endCall = () => {
    localPC.close();
    remotePC.close();
    setLocalStream(null);
    setRemoteStream(null);
    setIsCalling(false);
    setCallStarted(false);
    setCallState("");
  };

  return (
    <View style={styles.container}>
      {localStream && (
        <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
      )}
      {remoteStream && (
        <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />
      )}
      <View style={styles.buttonContainer}>
        {!isCalling ? (
          <Button title="Start Call" onPress={startCall} />
        ) : (
          <Button title="End Call" onPress={endCall} />
        )}
        <Text>{callState}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  localVideo: {
    width: 200,
    height: 150,
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: "black",
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CallScreen;
