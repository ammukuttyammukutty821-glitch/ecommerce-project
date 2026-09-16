import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Product() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products");

        console.log("Products API:", response.data);

        const data = response.data;

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Products Error:", error);

        setMessage(
          error.response?.data?.message ||
            "Unable to load products"
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      {message && <p>{message}</p>}

      <div className="products-container">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              className="product-card"
              key={product._id}
            >
              <h2>{product.name}</h2>

              <p>₹{product.price}</p>

              <p>{product.description}</p>

              <Link to={`/products/${product._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Product;