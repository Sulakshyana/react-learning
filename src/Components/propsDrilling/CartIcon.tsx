import { useContext } from "react";
import { userContext } from "./UserContext";

export default function CartIcon() {
  const context = useContext(userContext);
  if (!context) return <p>No Context Found</p>;
  const { cart } = context;

  return (
    <div style={{ position: "relative", fontSize: "20px" }}>
      🛒 Cart
      <span
        style={{
          marginLeft: "8px",
          color: cart.length > 0 ? "green" : "gray",
          fontWeight: "bold",
        }}
      >
        ({cart.length})
      </span>
      {cart.length > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-15px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
          }}
        >
          {cart.length}
        </span>
      )}
    </div>
  );
}
