import { useContext, useState } from "react";
import { userContext } from "./UserContext";
function AddToCart({ product }) {
  const { addToCart } = useContext(userContext)!;

  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={added}
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "8px",
        background: added ? "gray" : "blue",
        color: "white",
        cursor: "pointer",
      }}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}

export default AddToCart;
