import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [marketingOptOut, setMarketingOptOut] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
     
      navigate("/"); 
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-blue-300 via-purple-200 to-pink-200">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-1">Sign up</h2>
        <p className="text-gray-600 mb-6">
          Create an account or{" "}
          <Link to="/login" className="text-purple-600 font-medium">
            Sign in
          </Link>
        </p>

        <form onSubmit={handleRegister}>
          <label className="block mb-3">
            <span className="block text-sm font-medium text-gray-700 mb-1">Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block mb-3">
            <span className="block text-sm font-medium text-gray-700 mb-1">Username</span>
            <input
              type="text"
              placeholder="Your username"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="block mb-4 relative">
            <span className="block text-sm font-medium text-gray-700 mb-1">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-[38px] text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </label>

          <label className="flex items-start gap-2 mb-5 text-sm">
            <input
              type="checkbox"
              checked={marketingOptOut}
              onChange={() => setMarketingOptOut(!marketingOptOut)}
              className="mt-1"
            />
            <span>
              I do not want to receive emails with advertising, news, suggestions or marketing promotions
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:from-purple-600 hover:to-purple-800 transition"
          >
            Sign up
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-5">
          By signing up to create an account, you are accepting our{" "}
          <a href="#" className="underline">terms of service</a> and{" "}
          <a href="#" className="underline">privacy policy</a>
        </p>
      </div>
    </div>
  );
}
