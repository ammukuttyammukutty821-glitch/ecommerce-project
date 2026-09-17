import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState("");
const [loading, setLoading] = useState(true);//
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axiosInstance.get("/recommendations");

        const data =
          response.data.recommendations ||
          response.data.data ||
          response.data;

        setRecommendations(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error("Recommendation Error:", error);

        setMessage(
          error.response?.data?.message ||
            "Unable to load recommendations"
        );
      } finally {
      setLoading(false); 
      }
    };

    fetchRecommendations();
  }, []);

  

return (
    <div className="recommendations-page">
      <h1>AI Recommendations</h1>

      {message && <p>{message}</p>}

      {loading ? (
        <p>Loading recommendations...</p>
      ) : recommendations.length === 0 ? (
        <p>No recommendations found.</p>
      ) : (
        recommendations.map((item, index) => (
          <div className="recommendation-card" key={item._id || index}>
            <h2>{item.name || item.product || "Recommended Product"}</h2>
            {item.category && <p>Category: {item.category}</p>}
            {item.price && <p>Price: ${item.price}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default Recommendations;