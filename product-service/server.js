// product-service/server.js
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// ----------------------
// In-memory product list
// Each product belongs to a specific user (userId)
// ----------------------
let products = [
  { id: 1, name: "Sample Product 1", price: 100, userId: 1 },
  { id: 2, name: "Sample Product 2", price: 200, userId: 1 },
];

// ----------------------
// Middleware: JWT Auth
// ----------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user details
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// ----------------------
// Routes
// ----------------------

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Product Service OK" });
});

// GET products only of logged-in user
app.get("/products", authenticateToken, (req, res) => {
  const userProducts = products.filter((p) => p.userId === req.user.id);
  res.json(userProducts);
});

// CREATE new product (saved per user)
app.post("/products", authenticateToken, (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    userId: req.user.id, // ⭐ important: assign owner
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct,
  });
});

// UPDATE product (only owner's product can be updated)
app.put("/products/:id", authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const product = products.find(
    (p) => p.id === id && p.userId === req.user.id
  );

  if (!product) {
    return res
      .status(403)
      .json({ message: "You cannot update this product" });
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;

  res.json({
    message: "Product updated successfully",
    product,
  });
});

// DELETE product (user can delete only their own products)
app.delete("/products/:id", authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);

  const index = products.findIndex(
    (p) => p.id === id && p.userId === req.user.id
  );

  if (index === -1) {
    return res
      .status(403)
      .json({ message: "You cannot delete this product" });
  }

  const deleted = products[index];
  products.splice(index, 1);

  res.json({
    message: "Product deleted successfully",
    deleted,
  });
});

// ----------------------
// Start server
// ----------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Product Service running on port ${PORT}`);
});

