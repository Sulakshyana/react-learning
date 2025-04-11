import "./index.css";
import { Route, Routes } from "react-router-dom";
import AutoCounter from "./components/AutoCounter";
import Counter from "./components/Counter";
import Home from "./components/Home";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/count" element={<Counter />} />
      <Route path="/auto-counter" element={<AutoCounter />} />
    </Routes>
  );
};

export default Router;
