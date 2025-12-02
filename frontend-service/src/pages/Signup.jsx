// src/pages/Signup.jsx
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ✅ Correct background image
import banner from "../assets/microservices-banner.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await api.post("/signup", { email, password });

      if (res.data.message) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Signup failed — user may already exist.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-start"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      {/* Signup Form Box — positioned similar to login */}
      <div className="mt-64 ml-40 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/20">

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Create Account
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

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        {/* Already have an account? */}
        <p className="text-center mt-4">
          <span className="text-gray-700">Already have an account?</span>{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
