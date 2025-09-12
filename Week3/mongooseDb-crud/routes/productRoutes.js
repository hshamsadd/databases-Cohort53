import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);
// Get a product by id
router.get("/:id", getProductById);
// Create a product
router.post("/", createProduct);
// Update a product by id
router.put("/:id", updateProductById);
// delete a product by id
router.delete("/:id", deleteProductById);

export default router;