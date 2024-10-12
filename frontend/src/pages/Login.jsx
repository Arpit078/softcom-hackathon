import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setUsername(""); // Clear username input
    setPassword(""); // Clear password input
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        username,
        password,
      });
      console.log("Sign Up Response:", response.data);
      // Switch to sign in mode after successful sign up
      toggleForm();
    } catch (error) {
      console.error("Sign Up Error:", error.response.data);
      // Handle error (e.g., show an error message)
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        username,
        password,
      });
      console.log("Sign In Response:", response.data);
      
      // Store the user token in localStorage
      localStorage.setItem("token", response.data.token); // Store token in localStorage

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Sign In Error:", error.response.data);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded w-full p-2"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignUp ? "Already have an account?" : "New to the site?"}
          <button onClick={toggleForm} className="text-blue-500 ml-1">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
