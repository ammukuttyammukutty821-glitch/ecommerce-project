const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// User: Create order
router.post("/", protect, createOrder);

// User: Get own orders
router.get("/", protect, getOrders);

// User: Get one own order
router.get("/:id", protect, getOrderById);

// Admin: Update order
router.put("/:id", protect, authorize("admin"), updateOrder);

// Admin: Delete order
router.delete("/:id", protect, authorize("admin"), deleteOrder);

module.exports = router;