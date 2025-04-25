import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import profilePic from "../assets/map.webp";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[3px]"
          style={{ backgroundImage: `url(${profilePic})` }}
        ></div>


      {/* Transparent Login Form */}
      <div className="relative z-10 bg-black/20 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md border">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded bg-white/60 placeholder-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded bg-white/60 placeholder-gray-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-300 hover:underline font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
