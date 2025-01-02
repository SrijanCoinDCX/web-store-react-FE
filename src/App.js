import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [protectedData, setProtectedData] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username: "testuser" },
        { withCredentials: true } // Include cookies with the request
      );
      setLoginMessage(response.data.message || "Login successful");
    } catch (error) {
      setLoginMessage(error.response?.data?.message || "Login failed");
    }
  };

  // Function to fetch protected data
  const fetchProtectedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/protected",
        {
          withCredentials: true, // Include HTTP-only cookies in the request
        }
      );
      setProtectedData(response.data.message || "Data fetched successfully");
    } catch (error) {
      setProtectedData(error.response?.data?.message || "Error fetching data");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: 'green' }}>React Secure App with HTTP-Only Cookies</h1>
      <button onClick={handleLogin} style={{ margin: "10px" }}>
        Login
      </button>
      <p>{loginMessage}</p>
      <button onClick={fetchProtectedData} style={{ margin: "10px" }}>
        Fetch Protected Data
      </button>
      <p>{protectedData}</p>
    </div>
  );
};

export default App;
