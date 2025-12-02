import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { token } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8 text-blue-600">Dashboard</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/products" className="text-gray-700 hover:text-blue-600">
          📦 Products
        </Link>

        <Link to="/add-product" className="text-gray-700 hover:text-blue-600">
          ➕ Add Product
        </Link>

        {!token && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              🔐 Login
            </Link>

            <Link to="/signup" className="text-gray-700 hover:text-blue-600">
              📝 Signup
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
