import { useEffect, useContext } from "react";
import { productApi } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Products() {
  const { token, products, setProducts } = useContext(AuthContext);

  const loadProducts = async () => {
    try {
      const res = await productApi.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products", err);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          to="/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 shadow rounded-lg border hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-600">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
