import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user";
import { collection, addDoc, setDoc, doc, getDoc, query, where, getDocs, updateDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
      dispatch(setUser({ id: user.uid, name: "test name" }));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function addUser(firstName, lastName, email, age, gender, userBio, location) {
    return setDoc(doc(db, "users", currentUser.uid), {
      firstName,
      lastName,
      email,
      age,
      gender,
      userBio,
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

  function addNotification(uid, notifications) {
    return addDoc(doc(db, "notifications", uid), {
      uid,
      notifications,
    });
  }

  function updateNotifications(userId, notifications) {
    return updateDoc(doc(db, "notifications", userId), {
      notifications,
    });
  }

  function getNotificationByUser(userId) {
    return getDoc(doc(db, "notifications", userId));
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
    addNotification,
    getNotificationByUser,
    updateNotifications,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
