import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <h1>Discover. Compare. Shop.</h1>

      <p>
        Explore quality products and enjoy a simple shopping experience.
      </p>

      <button onClick={() => navigate ("/products")}>Explore Products</button>

    </div>
  );
}

export default Home;