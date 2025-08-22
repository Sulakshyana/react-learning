import "./index.css";
import { Route, Routes } from "react-router-dom";
import AutoCounter from "./components/AutoCounter";
import Counter from "./components/Counter";
import Home from "./components/Home";
import InputField from "./components/InputField";
import InputFieldUseRef from "./components/inputFieldUseRef";
import TodoItem from "./components/TodoItem";
import UseReducer from "./components/UseReducer";
import UseReducerATodoList from "./components/UseReducerTodoList";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/count" element={<Counter />} />
      <Route path="/auto-counter" element={<AutoCounter />} />
      <Route path="/input-field" element={<InputField />} />
      <Route path="/input-field-2" element={<InputFieldUseRef />} />
      <Route path="/todo-list" element={<TodoItem />} />
      <Route path="/use-reducer" element={<UseReducer />} />
      <Route path="/useReducer-todo-list" element={<UseReducerATodoList />} />
    </Routes>
  );
};

export default Router;
