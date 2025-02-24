// src/components/VenueSuggestions.js
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { venues } from "../venues";
import { categoryMappings } from "../categoryMappings";
import DebugPanel from "./DebugPanel";

const VenueSuggestions = ({ sessionId, setSelectedVenue }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [counts, setCounts] = useState({});
  
  useEffect(() => {
    const preferencesRef = ref(database, `sessions/${sessionId}/preferences`);
    onValue(preferencesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newCounts = {};
        Object.values(data).forEach((pref) => {
          newCounts[pref.category] = (newCounts[pref.category] || 0) + 1;
        });
        setCounts(newCounts);
        console.log("Category counts:", newCounts);

        const highestCount = Math.max(...Object.values(newCounts));
        const tiedCategories = Object.keys(newCounts).filter(
          (key) => newCounts[key] === highestCount
        );

        let majorityCategory;
        if (tiedCategories.length === 1) {
          majorityCategory = tiedCategories[0];
        } else {
          // Apply tie-breaker logic using categoryMappings.
          let found = false;
          for (let cat of tiedCategories) {
            const mapping = categoryMappings[cat]?.tieBreaker || [];
            for (let relatedCat of mapping) {
              if (tiedCategories.includes(relatedCat)) {
                majorityCategory = relatedCat;
                found = true;
                break;
              }
            }
            if (found) break;
          }
          if (!majorityCategory) {
            majorityCategory = tiedCategories[0];
          }
        }

        console.log("Majority category:", majorityCategory);
        setSelectedCategory(majorityCategory);
        setSuggestions(venues[majorityCategory] || []);
      }
    });
  }, [sessionId, setSelectedVenue]);

  return (
    <div>
      <h2>Suggested Venues</h2>
      {selectedCategory ? (
        <div>
          <h3>Category: {selectedCategory}</h3>
          {suggestions.map((venue, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h4>{venue.name}</h4>
              <p>{venue.description}</p>
              <p>Rating: {venue.rating}</p>
              <p>Average Cost for Two: ₹{venue.avgCostForTwo}</p>
              <a href={venue.mapLink} target="_blank" rel="noreferrer">
                View on Map
              </a>
              <br />
              <button onClick={() => setSelectedVenue(venue)}>
                Vote for this Venue
              </button>
            </div>
          ))}
          {/* Show debug panel for professor's insight */}
          <DebugPanel counts={counts} majorityCategory={selectedCategory} />
        </div>
      ) : (
        <p>Waiting for group preferences...</p>
      )}
    </div>
  );
};

export default VenueSuggestions;
