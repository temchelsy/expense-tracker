
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../providers/app-context";

export default function Register() {
  const [firstname, setFirstname] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const { setCurrentUser } = useAppContext(); // Custom hook for user context
  const navigate = useNavigate(); // Hook for navigation

  const handleFirstnameChange = (e) => setFirstname(e.target.value); // Handler for firstname input
  const handleEmailChange = (e) => setEmail(e.target.value); // Handler for email input
  const handlePasswordChange = (e) => setPassword(e.target.value); // Handler for password input
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value); // Handler for confirm password input

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api-v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,  // Sending firstname to the backend
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Sign up failed. Please try again.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary mb-6">Register</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Firstname Field */}
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-secondary mb-2">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstname"
                placeholder="Enter first name"
                value={firstname}
                onChange={handleFirstnameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
                required
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute right-3 top-3 text-primary"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-secondary mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
                required
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute right-3 top-3 text-primary"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
                required
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute right-3 top-3 text-primary"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-secondary mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-secondary focus:ring-secondary"
                required
              />
              <FontAwesomeIcon
                icon={faLock}
                className="absolute right-3 top-3 text-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-black py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Sign Up
          </button>
        </form>
        <h4 className="text-primary mt-6">Already have an account?</h4>
        <Link
          to="/login"
          className="w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary-dark transition-colors mt-2 text-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
