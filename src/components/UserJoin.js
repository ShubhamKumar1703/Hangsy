// src/components/UserJoin.js
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { database } from "../firebase";

const UserJoin = ({ sessionId, setUser }) => {
  const [name, setName] = useState("");

  const joinSession = () => {
    if (!name) return alert("Please enter your name.");
    const userId = uuidv4();
    // Save user info under sessions/{sessionId}/users/{userId}
    set(ref(database, `sessions/${sessionId}/users/${userId}`), {
      name,
      vote: null,
    }).then(() => {
      setUser({ id: userId, name });
    });
  };

  return (
    <div>
      <h2>Join Session</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={joinSession}>Join</button>
    </div>
  );
};

export default UserJoin;
