import "./index.css";
import { Route, Routes } from "react-router-dom";
import AutoCounter from "./components/AutoCounter";
import Counter from "./components/Counter";
import Home from "./components/Home";
import InputField from "./components/InputField";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/count" element={<Counter />} />
      <Route path="/auto-counter" element={<AutoCounter />} />
      <Route path="/input-field" element={<InputField />} />
    </Routes>
  );
};

export default Router;
