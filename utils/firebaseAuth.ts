// Example code for Firebase Authentication (already integrated in previous examples)

// Sign in with Google using Firebase Authentication
const signInWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    console.log("Signed in with Google:", user);
  } catch (error) {
    console.error("Google sign in error:", error);
  }
};

// Sign out
const signOut = async () => {
  try {
    await firebase.auth().signOut();
    console.log("Signed out");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
