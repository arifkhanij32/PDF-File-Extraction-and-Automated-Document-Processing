import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.access_token);
      alert("Login Successful!");

      // Redirect based on user role
      if (response.role === "Admin") {
        navigate("/admin");
      } else if (response.role === "SuperAdmin") {
        navigate("/super-admin");
      } else {
        setError("Unauthorized role. Please contact support.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again or sign up.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        style={{ margin: "5px", padding: "8px", width: "250px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        style={{ margin: "5px", padding: "8px", width: "250px" }}
      />
      <div>
        <button type="submit" style={{ padding: "8px 20px", margin: "5px" }}>
          Login
        </button>
        {/* Signup Button */}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          style={{
            padding: "8px 20px",
            margin: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;