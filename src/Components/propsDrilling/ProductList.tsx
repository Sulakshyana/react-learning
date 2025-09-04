import ProductCard from "./ProductCard";

export default function ProductList() {
  const products = [
    { id: 1, name: "Laptop", price: 999, image: "💻" },
    { id: 2, name: "Phone", price: 599, image: "📱" },
    { id: 3, name: "Headphones", price: 199, image: "🎧" },
  ];
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
