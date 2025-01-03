import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin, onSwitch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gratitude-journal-backend.onrender.com/api/auth/login",
        { username, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username); // Save the username
      onLogin(token);
      navigate("/journal"); // Redirect to the Journal page
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account?{" "}
          <button type="button" onClick={onSwitch}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
