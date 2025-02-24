// src/components/UserList.js
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const UserList = ({ sessionId }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const usersRef = ref(database, `sessions/${sessionId}/users`);
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      setUsers(data);
    });
  }, [sessionId]);

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>Users in Session:</h3>
      <ul>
        {Object.entries(users).map(([uid, user]) => (
          <li key={uid}>
            {user.name} {user.vote ? `(Voted: ${user.vote})` : "(Not Voted Yet)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

