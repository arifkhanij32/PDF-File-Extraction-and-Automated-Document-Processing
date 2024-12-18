import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert("Signup Successful! Please login now.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Signup</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Role (Admin or SuperAdmin)"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Signup
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};

export default Signup;