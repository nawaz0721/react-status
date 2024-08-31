import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

const StatusCard = ({ text, bgColor, textColor, time }) => {
  return (
    <div
      className="status-card"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <div>{text}</div>
      <div>{time}s</div>
    </div>
  );
};

const StatusApp = () => {
  const [statusText, setStatusText] = useState("");
  const [bgColor, setBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [statuses, setStatuses] = useState([]);

  const handleAddStatus = () => {
    const newStatus = {
      id: Date.now(), // Unique ID for each status
      text: statusText.toUpperCase(),
      bgColor,
      textColor,
      time: 30, // Set the time to 30 seconds
    };
    setStatuses([...statuses, newStatus]);
    setStatusText(""); // Clear the input after adding
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStatuses((statuses) =>
        statuses
          .map((status) =>
            status.time > 0 ? { ...status, time: status.time - 1 } : status
          )
          .filter((status) => status.time > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Your Status"
          value={statusText}
          onChange={(e) => setStatusText(e.target.value)}
        />
        <div>
          <label>Bg Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <div>
          <label>Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>
        <button onClick={handleAddStatus}>Add</button>
      </div>
      <div>
        {statuses.map((status) => (
          <StatusCard
            key={status.id}
            text={status.text}
            bgColor={status.bgColor}
            textColor={status.textColor}
            time={status.time}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusApp;
