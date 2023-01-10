import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, setDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //Signup
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  //Login
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  //Logout
  function logout() {
    return auth.signOut();
  }

  //Reset Password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  //Update Email
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  //Update Password
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  //Check logged in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function addUser(firstName, lastName, email, gender, location) {
    return setDoc(doc(db, "users", currentUser.uid), {
      name,
      age,
      email,
      gender,
      location,
    });
  }
  function addMessage(text, createdAt, uid, photoURL) {
    return addDoc(collection(db, "messages"), {
      text,
      createdAt,
      uid,
      photoURL,
    });
  }

  async function getUser() {
    //return getDoc(doc(db, "users", currentUser.uid));
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
    //return await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    addUser,
    getUser,
    addMessage,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
