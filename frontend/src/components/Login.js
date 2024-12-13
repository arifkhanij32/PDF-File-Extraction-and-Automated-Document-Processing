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
      setError("Invalid credentials. Please sign up.");
      setTimeout(() => navigate("/signup"), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
