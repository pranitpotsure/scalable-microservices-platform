// frontend-service/src/api/api.js

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000", // Auth Service
  headers: {
    "Content-Type": "application/json",
  },
});

export const productApi = axios.create({
  baseURL: "http://localhost:5000", // Product Service
  headers: {
    "Content-Type": "application/json",
  },
});
