const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const recommendationRoutes = require("./routes/recommendationRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const productRoutes = require("./routes/productRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authenticationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRoutes);
// Home
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Backend API is running successfully"
  });
});

// Error Handler
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });