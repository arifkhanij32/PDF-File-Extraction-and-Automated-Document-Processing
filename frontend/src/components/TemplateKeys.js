import React, { useEffect, useState } from "react";
import { getTemplateKeys, createTemplateKey, updateTemplateKey, deleteTemplateKey } from "../services/api";

const TemplateKeys = () => {
  const [keys, setKeys] = useState([]); // State for fetched template keys
  const [newKey, setNewKey] = useState(""); // State for input field
  const [editingKey, setEditingKey] = useState(null); // Track key being edited

  // Fetch all template keys
  const fetchKeys = async () => {
    try {
      const response = await getTemplateKeys();
      setKeys(response.templates); // Update the keys state
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

  // Load keys on component mount
  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <div>
      <h2>Template Keys</h2>
      
      {/* Input Section */}
      <input
        type="text"
        placeholder="Template Key Name"
        value={newKey}
        onChange={(e) => setNewKey(e.target.value)}
      />
      {editingKey ? (
        <button onClick={handleUpdateKey}>Update Key</button>
      ) : (
        <button onClick={handleCreateKey}>Add Key</button>
      )}

      {/* List Section */}
      <ul>
        {keys.map((key) => (
          <li key={key.id}>
            <strong>Name:</strong> {key.name} <br />
            <strong>Description:</strong> {key.description || "No description"} <br />
            <button onClick={() => { setEditingKey(key.id); setNewKey(key.name); }}>Edit</button>
            <button onClick={() => handleDeleteKey(key.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateKeys;
