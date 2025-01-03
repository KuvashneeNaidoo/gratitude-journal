import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/Navbar";
import Affirmations from "./components/Affirmations";
import Journal from "./components/JournalForm";
import axios from "axios";
import "./components/styles.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Use the hosted backend URL instead of localhost
  const backendUrl = "https://gratitude-journal-backend.onrender.com";

  useEffect(() => {
    if (token) {
      axios
        .get(`${backendUrl}/api/journal/entries`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch((err) => console.error("Error fetching journal entries:", err));
    }
  }, [token]);

  const handleLogin = (newToken, name) => {
    setToken(newToken);
    setUsername(name);
    setIsLoggedOut(false);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedOut(true);
  };

  const handleRegisterSwitch = () => setIsRegistering(!isRegistering);

  return (
    <Router>
      <div>
        {isLoggedOut && <Navigate to="/" replace />}
        {!token ? (
          <div>
            {!isRegistering ? (
              <LoginForm
                onLogin={handleLogin}
                onSwitch={handleRegisterSwitch}
              />
            ) : (
              <RegisterForm onSwitch={handleRegisterSwitch} />
            )}
          </div>
        ) : (
          <>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route path="/journal" element={<Journal token={token} />} />
              <Route path="/affirmations" element={<Affirmations />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
