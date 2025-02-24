// src/App.js
import React, { useState, useEffect } from "react";
import GroupSession from "./components/GroupSession";
import PreferencesForm from "./components/PreferencesForm";
import VenueSuggestions from "./components/VenueSuggestions";
import LiveVoting from "./components/LiveVoting";
import FinalRecommendation from "./components/FinalRecommendation";
import UserJoin from "./components/UserJoin";
import UserList from "./components/UserList";

function App() {
  const [sessionId, setSessionId] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Check for sessionId in URL on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSessionId = params.get("sessionId");
    if (urlSessionId) {
      setSessionId(urlSessionId);
    }
  }, []);

  const handleJoinSession = () => {
    const inputSessionId = prompt("Enter Session ID:");
    if (inputSessionId) {
      setSessionId(inputSessionId);
      window.history.replaceState(null, "", `?sessionId=${inputSessionId}`);
    }
  };

  const exitSession = () => {
    setSessionId("");
    setSelectedVenue(null);
    setCurrentUser(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>AI-Driven Social Outing App Prototype</h1>
      {!sessionId ? (
        <div>
          <GroupSession setSessionId={setSessionId} />
          <hr />
          <button onClick={handleJoinSession}>Join Existing Session</button>
        </div>
      ) : (
        <>
          <p>Your Session ID: {sessionId}</p>
          <button onClick={exitSession}>Exit Session</button>
          {/* If user has not joined yet, prompt for name */}
          {!currentUser ? (
            <UserJoin sessionId={sessionId} setUser={setCurrentUser} />
          ) : (
            <>
              <p>Welcome, {currentUser.name}!</p>
              <UserList sessionId={sessionId} />
              <PreferencesForm sessionId={sessionId} />
              <VenueSuggestions sessionId={sessionId} setSelectedVenue={setSelectedVenue} />
              <LiveVoting sessionId={sessionId} selectedVenue={selectedVenue} currentUser={currentUser} />
              <FinalRecommendation sessionId={sessionId} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
