// src/components/DebugPanel.js
import React from "react";

const DebugPanel = ({ counts, majorityCategory }) => {
  return (
    <div style={{ border: "1px dashed #666", padding: "10px", marginTop: "20px" }}>
      <h3>Debug Panel</h3>
      <p><strong>Vote Counts:</strong></p>
      <pre>{JSON.stringify(counts, null, 2)}</pre>
      <p><strong>Computed Majority Category:</strong> {majorityCategory}</p>
    </div>
  );
};

export default DebugPanel;
