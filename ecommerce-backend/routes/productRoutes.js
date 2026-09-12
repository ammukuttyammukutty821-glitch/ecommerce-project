const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all products + search/filter/sort
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Admin only - Create
router.post("/", protect, authorize("admin"), createProduct);

// Admin only - Update
router.put("/:id", protect, authorize("admin"), updateProduct);

// Admin only - Delete
router.delete("/:id", protect, authorize("admin"), deleteProduct);

module.exports = router;