const Order = require("../models/order");
const Product = require("../models/product");

const getRecommendations = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    });

    const purchasedProductIds = orders.flatMap(order =>
      order.products.map(item => item.product.toString())
    );

    const recommendations = await Product.find({
      _id: { $nin: purchasedProductIds }
    }).limit(5);

    res.json({
      message: "Product recommendations",
      recommendations
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecommendations };