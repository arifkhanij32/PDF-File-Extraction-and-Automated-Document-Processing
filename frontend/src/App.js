import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import TemplateKeys from "./components/TemplateKeys"; // Use correct file name
import FileUpload from "./components/FileUpload";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/template-keys" element={<TemplateKeys />} />
        <Route path="/file-upload" element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
