import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);

        const data =
          response.data.product ||
          response.data.data ||
          response.data;

        setProduct(data);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Product not found"
        );
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!id) {
      setMessage("Product ID not found");
      return;
    }

    const cartProduct = {
      ...product,
      _id: id,
    };

    localStorage.setItem(
      "cartProduct",
      JSON.stringify(cartProduct)
    );

    navigate("/cart");
  };

  if (!product) {
    return <h2>{message || "Loading product..."}</h2>;
  }

  return (
    <div className="product-detail">
      <h1>Product Details</h1>

      <h2>{product.name}</h2>

      <h3>Price: ₹{product.price}</h3>

      <p>{product.description}</p>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>

      <br />
      <br />

      <Link to="/products">
        <button>Back to Products</button>
      </Link>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ProductDetail;