import React, { useState } from "react";
import { uploadFile } from "../services/api";

const FileUpload = () => {
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
      setExtractedText(response.extracted_text);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
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
    <div>
      <h2>Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>

      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{extractedText}</pre>
          <button onClick={downloadTextFile}>Download Extracted Text</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
