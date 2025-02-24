// src/components/LiveVoting.js
import React, { useEffect, useState } from "react";
import { ref, onValue, runTransaction, set } from "firebase/database";
import { database } from "../firebase";

const LiveVoting = ({ sessionId, selectedVenue, currentUser }) => {
  const [votes, setVotes] = useState({});

  useEffect(() => {
    const votesRef = ref(database, `sessions/${sessionId}/votes`);
    onValue(votesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setVotes(data);
    });
  }, [sessionId]);

  const voteForVenue = (venueName) => {
    // Update vote count for the chosen venue
    const voteRef = ref(database, `sessions/${sessionId}/votes/${venueName}`);
    runTransaction(voteRef, (currentVotes) => (currentVotes || 0) + 1);

    // Also update the user's vote in the session
    if (currentUser) {
      set(ref(database, `sessions/${sessionId}/users/${currentUser.id}/vote`), venueName);
    }
  };

  return (
    <div>
      <h2>Live Voting</h2>
      {selectedVenue ? (
        <div>
          <h3>Finalizing: {selectedVenue.name}</h3>
          <button onClick={() => voteForVenue(selectedVenue.name)}>
            Vote for {selectedVenue.name}
          </button>
          <p>Current Votes: {votes[selectedVenue.name] || 0}</p>
        </div>
      ) : (
        <p>Please select a venue to vote for.</p>
      )}
    </div>
  );
};

export default LiveVoting;
