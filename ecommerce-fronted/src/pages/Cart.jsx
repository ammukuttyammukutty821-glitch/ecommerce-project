import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Cart() {
  const [cartProduct, setCartProduct] = useState(() => {
    const savedProduct = localStorage.getItem("cartProduct");
    return savedProduct ? JSON.parse(savedProduct) : null;
  });

  const [message, setMessage] = useState("");

  const handleRemove = () => {
    localStorage.removeItem("cartProduct");
    setCartProduct(null);
  };

  const handlePlaceOrder = async () => {
    if (!cartProduct) {
      setMessage("Cart is empty");
      return;
    }

    const productId = cartProduct._id;

    if (!productId) {
      setMessage("Product ID missing. Please add the product again.");
      return;
    }

    try {
      const response = await axiosInstance.post("/orders", {
        products: [
          {
            product: productId,
            quantity: 1,
            price: cartProduct.price,
          },
        ],
        totalAmount: cartProduct.price,
      });

      setMessage(
        response.data.message || "Order created successfully"
      );

      localStorage.removeItem("cartProduct");
      setCartProduct(null);
    } catch (error) {
      console.error("Order Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to create order"
      );
    }
  };

  if (!cartProduct) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        {message && <p>{message}</p>}
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <h2>{cartProduct.name}</h2>

      <p>Price: ₹{cartProduct.price}</p>

      <p>Quantity: 1</p>

      <button onClick={handleRemove}>
        Remove
      </button>

      <h2>Total: ₹{cartProduct.price}</h2>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Cart;