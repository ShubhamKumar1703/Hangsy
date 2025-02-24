// src/components/FinalRecommendation.js
import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const FinalRecommendation = ({ sessionId }) => {
  const [finalVenue, setFinalVenue] = useState(null);

  useEffect(() => {
    // Listen for changes in votes
    const votesRef = ref(database, `sessions/${sessionId}/votes`);
    onValue(votesRef, (snapshot) => {
      const votes = snapshot.val();
      if (votes) {
        // Find venue with maximum votes
        const final = Object.keys(votes).reduce((a, b) =>
          votes[a] > votes[b] ? a : b
        );
        setFinalVenue(final);
      }
    });
  }, [sessionId]);

  return (
    <div>
      <h2>Final Recommendation</h2>
      {finalVenue ? (
        <div>
          <h3>{finalVenue}</h3>
          <a href={`https://maps.google.com/?q=${finalVenue}`} target="_blank" rel="noreferrer">
            Navigate via Google Maps
          </a>
        </div>
      ) : (
        <p>Voting is ongoing...</p>
      )}
    </div>
  );
};

export default FinalRecommendation;
