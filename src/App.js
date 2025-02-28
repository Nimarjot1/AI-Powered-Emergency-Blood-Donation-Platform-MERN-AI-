import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Chatbot from "./components/Chatbot";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      <Chatbot />
    </div>
  );
}

export default App;