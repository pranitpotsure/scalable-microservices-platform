// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthProvider from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Toast (using react-hot-toast)
import { Toaster } from "react-hot-toast";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Toast System */}
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes (with Navbar + Sidebar) */}
          <Route
            path="/products"
            element={
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            }
          />

          <Route
            path="/add-product"
            element={
              <DashboardLayout>
                <AddProduct />
              </DashboardLayout>
            }
          />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
