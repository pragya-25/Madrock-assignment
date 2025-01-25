import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div style={{ width: "250px", padding: "20px", backgroundColor: "#f4f4f4" }}>
      <h3>Dashboard</h3>
      <ul>
        {/* Links to Students Page and Logout */}
        <li>
          <Link to="/students">Students Page</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
