// src/pages/AddProduct.jsx
import { useState, useContext } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { productApi } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      await productApi.post(
        "/products",
        { name, price: Number(price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Product added");
      navigate("/products");
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

      <Input label="Product Name" value={name} setValue={setName} />
      <Input label="Price" value={price} setValue={setPrice} type="number" />

      <Button text="Add Product" onClick={handleAdd} className="w-full mt-2" />
    </div>
  );
}
