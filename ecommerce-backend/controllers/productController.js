const Product = require("../models/product");

// CREATE
const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, description, stock } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        message: "Name, category and price are required"
      });
    }

    if (price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative"
      });
    }

    const product = await Product.create({
      name,
      category,
      price,
      description,
      stock
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL + SEARCH + FILTER + SORT
const getProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    if (sort === "price_asc") {
      query = query.sort({ price: 1 });
    }

    if (sort === "price_desc") {
      query = query.sort({ price: -1 });
    }

    const products = await query;

    res.json({
      products
    });
  } catch (error) {
    next(error);
  }
};
// READ ONE
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};