import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ borderRight: "1px solid gray", padding: "10px" }}>
      <ul>
        <li><Link to="/template-keys">Template Keys</Link></li>
        <li><Link to="/file-upload">File Upload</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;