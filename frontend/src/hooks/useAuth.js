import { useState } from "react";
import { login, signup } from "../services/api";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials) => {
    const { data } = await login(credentials);
    localStorage.setItem("token", data.access_token);
    setUser(data.user);
  };

  const handleSignup = async (credentials) => {
    await signup(credentials);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, handleLogin, handleSignup, logout };
};

export default useAuth;
