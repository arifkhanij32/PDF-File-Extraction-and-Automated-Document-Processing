import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-container" style={{ display: "flex" }}>
        <Sidebar />
        <div className="content" style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;