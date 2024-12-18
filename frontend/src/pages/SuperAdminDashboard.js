import React from "react";
import Layout from "../components/Layout";
import FileUpload from "../components/FileUpload";
import "./SuperAdminDashboard.css"; // Add custom styles

const SuperAdminDashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Super Admin Dashboard</h2>
        </div>
        <div className="widget-container">
          {/* Example Widgets */}
          <div className="widget widget-stats">Pdf</div>
          <div className="widget widget-users">Extraction</div>
          <div className="widget widget-orders">Document</div>
        </div>
        <div className="file-upload-section">
          <FileUpload />
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
