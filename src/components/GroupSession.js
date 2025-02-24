// src/components/GroupSession.js
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const GroupSession = ({ setSessionId }) => {
  const [sessionName, setSessionName] = useState("");

  const createSession = () => {
    const newSessionId = uuidv4();
    // Save session to Firebase
    set(ref(database, "sessions/" + newSessionId), {
        sessionName,
        createdAt: Date.now()
      });
    setSessionId(newSessionId);
  };

  return (
    <div>
      <h2>Create Group Session</h2>
      <input
        type="text"
        placeholder="Enter Session Name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
      />
      <button onClick={createSession}>Create Session</button>
    </div>
  );
};

export default GroupSession;
