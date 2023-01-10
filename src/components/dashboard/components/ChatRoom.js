import React, { useEffect, useState, useRef } from "react";
import firebase from "../../../firebase";

import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import {
  collection,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

export default function ChatRoom() {
  const { currentUser, addMessage } = useAuth();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(q, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = currentUser;
    try {
      //setError("");
      await addMessage(formValue, serverTimestamp(), uid, photoURL);
    } catch {
      //setError("Failed to create an account");
    }
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />
        <button type="submit">+</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { currentUser, getUser } = useAuth();
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
      />
      <p>{text}</p>
    </div>
  );
}
