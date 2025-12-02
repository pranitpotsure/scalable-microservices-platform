// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);

  // login does NOT navigate here
  const login = (tokenVal) => {
    setToken(tokenVal);
    localStorage.setItem("token", tokenVal);
  };

  // logout does NOT navigate here
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setProducts([]);

    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, products, setProducts }}>
      {children}
    </AuthContext.Provider>
  );
}
