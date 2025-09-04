import { useReducer, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Todo.css";

type TTodo = { id: number; text: string; completed: boolean };
type TTodoInput = { id: number | null; text: string };
type TFilter = "all" | "completed" | "notCompleted";

type TState = { todos: TTodo[]; currentTodo: TTodoInput; filter: TFilter };

type TAction =
  | { type: "add"; payload: string }
  | { type: "update"; payload: { id: number; text: string } }
  | { type: "delete"; payload: number }
  | { type: "toggle"; payload: number }
  | { type: "setFilter"; payload: TFilter }
  | { type: "setCurrentTodo"; payload: TTodoInput }
  | { type: "resetCurrentTodo" }
  | { type: "setTodos"; payload: TTodo[] };

const reducer = (s: TState, a: TAction): TState => {
  switch (a.type) {
    case "add":
      return a.payload.trim()
        ? {
            ...s,
            todos: [
              { id: Date.now(), text: a.payload, completed: false },
              ...s.todos,
            ],
            currentTodo: { id: null, text: "" },
          }
        : s;

    case "update":
      return s.currentTodo.text.trim()
        ? {
            ...s,
            todos: s.todos.map((t) =>
              t.id === a.payload.id ? { ...t, text: a.payload.text } : t
            ),
            currentTodo: { id: null, text: "" },
          }
        : s;

    case "delete":
      return { ...s, todos: s.todos.filter((t) => t.id !== a.payload) };

    case "toggle":
      return {
        ...s,
        todos: s.todos.map((t) =>
          t.id === a.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case "setTodos":
      return { ...s, todos: a.payload };

    case "setFilter":
      return { ...s, filter: a.payload };

    case "setCurrentTodo":
      return { ...s, currentTodo: a.payload };

    case "resetCurrentTodo":
      return { ...s, currentTodo: { id: null, text: "" } };

    default:
      return s;
  }
};

const Todo = () => {
  const init = (): TState => {
    try {
      const stored = localStorage.getItem("todos");
      const todos: TTodo[] = stored ? JSON.parse(stored) : [];
      return { todos, currentTodo: { id: null, text: "" }, filter: "all" };
    } catch (err) {
      console.error("Failed to load todos from localStorage", err);
      return { todos: [], currentTodo: { id: null, text: "" }, filter: "all" };
    }
  };

  const [state, dispatch] = useReducer(reducer, undefined, init);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("todos");
      if (stored) {
        const parsed: TTodo[] = JSON.parse(stored);
        dispatch({ type: "setTodos", payload: parsed });
      }
    } catch (err) {
      console.error("Failed to load todos from localStorage", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (state.currentTodo.id) inputRef.current?.focus();
  }, [state.currentTodo]);

  const saveTodo = () =>
    dispatch(
      state.currentTodo.id !== null
        ? {
            type: "update",
            payload: { id: state.currentTodo.id, text: state.currentTodo.text },
          }
        : { type: "add", payload: state.currentTodo.text }
    );

  // derived state: filter todos
  const filtered = state.todos.filter((t) =>
    state.filter === "completed"
      ? t.completed
      : state.filter === "notCompleted"
      ? !t.completed
      : true
  );
  filtered.sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>

      <div className="todo-container">
        <h2 className="todo-title">Todo List</h2>

        {/* input + add/update */}
        <div className="todo-input-section">
          <input
            type="text"
            ref={inputRef}
            value={state.currentTodo.text}
            placeholder="Add new task..."
            className="todo-input"
            onChange={(e) =>
              dispatch({
                type: "setCurrentTodo",
                payload: { ...state.currentTodo, text: e.target.value },
              })
            }
            onKeyDown={(e) => e.key === "Enter" && saveTodo()}
          />
          <button className="todo-btn add-btn" onClick={saveTodo}>
            {state.currentTodo.id ? "Update" : "Add"}
          </button>
        </div>

        {/* filter buttons */}
        <div className="filter-section">
          {(["all", "completed", "notCompleted"] as TFilter[]).map((f) => (
            <button
              key={f}
              className={`filter-btn ${state.filter === f ? "active" : ""}`}
              onClick={() => dispatch({ type: "setFilter", payload: f })}
            >
              {f === "all"
                ? "All"
                : f === "completed"
                ? "Completed"
                : "Not Completed"}
            </button>
          ))}
        </div>

        <h3 className="todo-subtitle">Your Tasks</h3>
        {!state.todos.length && "Todo List is Empty"}

        {/* todo list */}
        <ol className="todo-list">
          {filtered.map((t, i) => (
            <li key={t.id} className="todo-item">
              <span className="serial">{i + 1}</span>
              <span
                className={t.completed ? "task-text completed" : "task-text"}
              >
                {t.text}
              </span>
              <div className="todo-actions">
                {!t.completed && (
                  <button
                    className="todo-btn edit-btn"
                    onClick={() =>
                      dispatch({
                        type: "setCurrentTodo",
                        payload: { id: t.id, text: t.text },
                      })
                    }
                  >
                    Edit
                  </button>
                )}
                <button
                  className="todo-btn complete-btn"
                  onClick={() => dispatch({ type: "toggle", payload: t.id })}
                >
                  {t.completed ? "Completed" : "Mark Complete"}
                </button>
                <button
                  className="todo-btn delete-btn"
                  onClick={() => dispatch({ type: "delete", payload: t.id })}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Todo;
