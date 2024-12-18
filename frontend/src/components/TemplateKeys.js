import React, { useEffect, useState } from "react";
import {
  getTemplateKeys,
  createTemplateKey,
  updateTemplateKey,
  deleteTemplateKey,
} from "../services/api";
import "./TemplateKeys.css"; // Import the CSS file

const TemplateKeys = () => {
  const [keys, setKeys] = useState([]); // State for fetched template keys
  const [newKey, setNewKey] = useState(""); // State for input field
  const [editingKey, setEditingKey] = useState(null); // Track key being edited

  // Fetch all template keys
  const fetchKeys = async () => {
    try {
      const response = await getTemplateKeys();
      setKeys(response.templates);
    } catch (error) {
      console.error("Failed to fetch keys:", error);
    }
  };

  // Create a new key
  const handleCreateKey = async () => {
    try {
      await createTemplateKey({ name: newKey });
      alert("Key created successfully!");
      setNewKey("");
      fetchKeys();
    } catch (error) {
      alert("Failed to add key.");
    }
  };

  // Update an existing key
  const handleUpdateKey = async () => {
    try {
      await updateTemplateKey(editingKey, { name: newKey });
      alert("Key updated successfully!");
      setEditingKey(null);
      setNewKey("");
      fetchKeys();
    } catch (error) {
      alert("Failed to update key.");
    }
  };

  // Delete a key
  const handleDeleteKey = async (id) => {
    try {
      await deleteTemplateKey(id);
      alert("Key deleted successfully!");
      fetchKeys();
    } catch (error) {
      alert("Failed to delete key.");
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <div className="template-keys-container">
      <h2 className="template-keys-title">Template Keys</h2>

      {/* Input Section */}
      <div className="template-keys-form">
        <input
          type="text"
          placeholder="Template Key Name"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="template-keys-input"
        />
        {editingKey ? (
          <button
            className="template-keys-button-update"
            onClick={handleUpdateKey}
          >
            Update Key
          </button>
        ) : (
          <button
            className="template-keys-button-add"
            onClick={handleCreateKey}
          >
            Add Key
          </button>
        )}
      </div>

      {/* List Section */}
      <ul className="template-keys-list">
        {keys.map((key) => (
          <li key={key.id} className="template-keys-item">
            <div>
              <strong>Name:</strong> {key.name} <br />
              <strong>Description:</strong>{" "}
              {key.description || "No description"}
            </div>
            <div className="template-keys-button-group">
              <button
                className="template-keys-button-edit"
                onClick={() => {
                  setEditingKey(key.id);
                  setNewKey(key.name);
                }}
              >
                Edit
              </button>
              <button
                className="template-keys-button-delete"
                onClick={() => handleDeleteKey(key.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateKeys;

