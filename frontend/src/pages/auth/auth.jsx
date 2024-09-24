import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contex/Authcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Auth({ setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:8000/api-v1/auth/sign-in"
        : "http://localhost:8000/api-v1/auth/sign-up";
      const data = isLogin
        ? { email, password }
        : { username, email, password };
      const response = await axios.post(url, data);
      if (response.data) {
        login(response.data);
        navigate("/");
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response) {
        switch (err.response.status) {
          case 400:
            alert(err.response.data.message);
            break;
          case 401:
            alert("Unauthorized");
            break;
          default:
            alert("An error occurred. Please try again later.");
        }
      } else {
        console.error("Authentication failed:", err.message);
        alert("An error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <button
          className="mt-4 text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
}
export default Auth;