import { useContext } from "react";
import { userContext } from "./UserContext";
import CartIcon from "./CartIcon";

export default function CartHeader() {
  const context = useContext(userContext);
  if (!context) return <p>No Context Found</p>;
  const { user } = context;
  return (
    <>
      <h2>Welcome {user.name}</h2>
      <CartIcon />
    </>
  );
}
