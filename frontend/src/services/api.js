import axios from "axios";
import { getToken } from "./localStorageUtils";

const API_BASE_URL = "http://localhost:5000";

// Create an axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include token in Authorization header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Fetch token from local storage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// API Calls
export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, formData);
    return response.data; // Return only data
  } catch (err) {
    console.error("Signup Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Signup failed");
  }
};

export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
    return response.data; // Response includes access_token and role
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const admin = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/admin`, formData);
    return response.data; // Return only data
  } catch (err) {
    console.error("Signup Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Signup failed");
  }
};


export const superadmin = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/superadmin`, formData);
    return response.data; // Return only data
  } catch (err) {
    console.error("Signup Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Signup failed");
  }
};


export const uploadFile = async (formData) => {
  try {
    const response = await API.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Return extracted text
  } catch (err) {
    console.error("Upload File Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to upload file");
  }
};

// Correct Template Key APIs
export const createTemplateKey = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/template-keys", // Match route
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error creating key:", err.response?.data || err.message);
    throw err;
  }
};

// Update Template Key
export const updateTemplateKey = async (id, data) => {
  try {
    const response = await API.put(`/template-keys/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    handleError(err, "Failed to update template key");
  }
};

// Delete Template Key
export const deleteTemplateKey = async (id) => {
  try {
    const response = await API.delete(`/template-keys/${id}`);
    return response.data;
  } catch (err) {
    handleError(err, "Failed to delete template key");
  }
};


// Fetch Template Keys API
export const getTemplateKeys = async () => {
  try {
    const response = await API.get("/template-keys");
    return response.data; // Return only data
  } catch (err) {
    console.error("Get Template Keys Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch template keys");
  }
};