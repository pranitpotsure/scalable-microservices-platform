// src/pages/Login.jsx
import { useState, useContext } from "react";
import { api } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import banner from "../assets/microservices-banner.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { email, password });
      login(res.data.token);
      toast.success("Logged in successfully!");
      navigate("/products");
    } catch (err) {
      setMsg("Invalid email or password");
      toast.error("Login failed!");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-start"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* Login Card Positioned Properly */}
      <div className="mt-64 ml-36 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/20">

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Login
        </h2>

        {/* Email */}
        <label className="font-semibold">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="font-semibold">Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Error message */}
        {msg && <p className="text-red-600 mt-3 text-center">{msg}</p>}

        {/* NEW — Signup Link */}
        <p className="text-center mt-4">
          <span className="text-gray-700">Don't have an account?</span>{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}
