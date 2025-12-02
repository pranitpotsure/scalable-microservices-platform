import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();        // Clear token + toast
    navigate("/login");  // Redirect here safely
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Microservices Dashboard By Pranit Potsure</h2>

      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded-md"
        >
          Logout
        </button>
      )}
    </header>
  );
}
