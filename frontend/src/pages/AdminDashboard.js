import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import { uploadFile } from "../services/api";

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData);
      console.log("Upload Response:", response); // Debugging response
      setExtractedText(response.extracted_text || "No text extracted.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const downloadTextFile = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "extracted_text.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
    <div style={{ display: "flex" }}>
      <div style={{ padding: "10px" }}>
        <h2>Admin Dashboard</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
        {extractedText && (
          <div>
            <h3>Extracted Text:</h3>
            <pre>{extractedText}</pre>
            <button onClick={downloadTextFile}>Download Extracted Text</button>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default AdminDashboard;
