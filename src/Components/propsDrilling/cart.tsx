import { useState } from "react";
import CartHeader from "./CartHeader";
import ProductList from "./ProductList";
import { userContext } from "./UserContext";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const [user] = useState({
    name: "Swastika Ghimire",
    id: 1,
  });

  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <userContext.Provider value={{ user, cart, addToCart }}>
        <CartHeader />
        <ProductList />
      </userContext.Provider>
    </div>
  );
}
