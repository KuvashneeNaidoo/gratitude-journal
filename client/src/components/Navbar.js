import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const username = localStorage.getItem("username"); // Get the username from localStorage

  return (
    <nav>
      <div className="nav-left">
        {username && <span className="username">Welcome, {username}</span>}
      </div>
      <div className="nav-right">
        <Link to="/journal">Journal</Link>
        <Link to="/affirmations">Affirmations</Link>
        {/* Logout link as a nav item */}
        <Link to="#" onClick={onLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
