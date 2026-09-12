const Order = require("../models/order");

// CREATE ORDER
const createOrder = async (req, res, next) => {
  try {
    const { products, totalAmount } = req.body;

    if (!products || products.length === 0 || totalAmount === undefined) {
      return res.status(400).json({
        message: "Products and total amount are required"
      });
    }

    const order = await Order.create({
      user: req.user.id,
      products,
      totalAmount
    });

    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error) {
    next(error);
  }
};

// GET USER ORDERS
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    }).populate("products.product", "name price");

    res.json({
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE ORDER
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// UPDATE ORDER STATUS
const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      message: "Order updated successfully",
      order
    });
  } catch (error) {
    next(error);
  }
};

// DELETE ORDER
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      message: "Order deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};