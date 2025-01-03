import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const JournalForm = ({ token }) => {
  const [entries, setEntries] = useState([]);
  const [newEntryContent, setNewEntryContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To capture error messages

  useEffect(() => {
    if (token) {
      axios
        .get("https://gratitude-journal-backend.onrender.com/api/journal/entries", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setEntries(response.data))
        .catch((err) => console.error("Error fetching journal entries:", err));
    }
  }, [token]);

  const addNewEntry = (newEntry) => setEntries((prev) => [newEntry, ...prev]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://gratitude-journal-backend.onrender.com/api/journal/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch {
      alert("Error deleting entry");
    }
  };

  const handleEdit = async (id, newContent) => {
    try {
      const response = await axios.put(
        `https://gratitude-journal-backend.onrender.com/api/journal/entries/${id}`,
        { content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEntries((prev) =>
        prev.map((entry) => (entry.id === id ? response.data : entry))
      );
    } catch {
      alert("Error updating entry");
    }
  };

  const handleAddNewEntry = async () => {
    if (newEntryContent.trim()) {
      try {
        const response = await axios.post(
          "https://gratitude-journal-backend.onrender.com/api/journal/entries",
          { content: newEntryContent },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        addNewEntry(response.data);
        setNewEntryContent("");
        setErrorMessage(""); // Clear error message on success
      } catch (error) {
        console.error(
          "Error adding new entry:",
          error.response || error.message
        );
        setErrorMessage("Error adding new entry"); // Display error message
      }
    }
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className="journal-container">
      <div className="journal-form">
        <h2>Write a New Journal Entry</h2>
        <textarea
          value={newEntryContent}
          onChange={(e) => setNewEntryContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button onClick={handleAddNewEntry}>Add Entry</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Display error message */} 
      </div>

      <h2>Your Journal Entries</h2>
      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        <div className="entries-list">
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <textarea
                  defaultValue={entry.content}
                  onBlur={(e) => handleEdit(entry.id, e.target.value)}
                />
                <small>{formatDate(entry.date)}</small>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JournalForm;
