import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../service/authService";  // Ensure this is correctly imported

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signin(email, password);  // Call your authentication service

      // Assuming response.data contains user details including role
      if (response.status === 200) {
        const { role } = response.data;  // Extract the role from the response

        // Store user role in localStorage
        localStorage.setItem('userRole', role);

        // Redirect based on role (optional)
        if (role === "faculty") {
          navigate("/hello");
        } else {
          navigate("/hello");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An error occurred during sign-in");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
