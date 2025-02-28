import React from "react";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">🚑 BloodSync</h1>
      {isLoggedIn && (
        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;