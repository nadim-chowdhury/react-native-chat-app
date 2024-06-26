import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
import firebase from "firebase/app";
import "firebase/database";

const CallScreen = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [callState, setCallState] = useState("");

  let localPC;
  let remotePC;

  useEffect(() => {
    // Initialize Firebase (replace with your Firebase project config)
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Initialize peer connection objects
    localPC = new RTCPeerConnection();
    remotePC = new RTCPeerConnection();

    // Set up event handlers for the peer connection
    localPC.onicecandidate = (event) => {
      event.candidate && remotePC.addIceCandidate(event.candidate);
    };

    localPC.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };

    remotePC.onicecandidate = (event) => {
      event.candidate && localPC.addIceCandidate(event.candidate);
    };

    remotePC.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };

    // Clean up on unmount
    return () => {
      localPC.close();
      remotePC.close();
    };
  }, []);

  const startCall = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    stream && setLocalStream(stream);
    localPC.addStream(stream);

    // Create offer
    localPC.createOffer().then((offer) => {
      localPC.setLocalDescription(offer);
      remotePC.setRemoteDescription(offer);

      // Create answer
      remotePC.createAnswer().then((answer) => {
        remotePC.setLocalDescription(answer);
        localPC.setRemoteDescription(answer);
        setIsCalling(true);
        setCallStarted(true);
        setCallState("Calling...");
      });
    });
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
