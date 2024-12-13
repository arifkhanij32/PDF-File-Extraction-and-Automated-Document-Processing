import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
