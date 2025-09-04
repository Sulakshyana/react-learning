import AddToCart from "./AddToCartBtn";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "40px" }}>{product.image}</div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      {/* Pass addToCart further down */}
      <AddToCart product={product} />
    </div>
  );
}
