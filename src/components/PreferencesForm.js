// src/components/PreferencesForm.js
import React, { useState } from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";

const PreferencesForm = ({ sessionId }) => {
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [numPeople, setNumPeople] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionId || !category || !budget || !numPeople) {
      alert("Please fill all fields!");
      return;
    }
    
    const preference = { category, budget, numPeople };
    console.log("Submitting preference:", preference); // Debug log
    
    try {
      await push(ref(database, `sessions/${sessionId}/preferences`), preference);
      console.log("Preference saved successfully!");
      alert("Preferences saved successfully!");
      // Optionally reset the form fields
      setCategory("");
      setBudget("");
      setNumPeople("");
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div>
      <h2>Select Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        {/* Category Selection */}
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Cafe">Cafe</option>
          <option value="Mall">Mall</option>
          <option value="Adventure">Adventure</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Park">Park</option>
        </select>

        {/* Budget Selection */}
        <label>Budget:</label>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} required>
          <option value="">Select Budget</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000+">₹1000+</option>
        </select>

        {/* Number of People Selection */}
        <label>Number of People:</label>
        <select value={numPeople} onChange={(e) => setNumPeople(e.target.value)} required>
          <option value="">Select Group Size</option>
          <option value="0-2">0-2 People</option>
          <option value="2-4">2-4 People</option>
          <option value="4-8">4-8 People</option>
        </select>

        <button type="submit">Submit Preferences</button>
      </form>
    </div>
  );
};

export default PreferencesForm;
