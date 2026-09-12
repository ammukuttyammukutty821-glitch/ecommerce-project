import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("Please login first");
          return;
        }

        const response = await axiosInstance.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error);

        setMessage(
          error.response?.data?.message || "Failed to load orders"
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {message && <p>{message}</p>}

      {orders.length === 0 && !message ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>

            <p>Total Amount: ₹{order.totalAmount}</p>

            <p>Status: {order.status || "Processing"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;