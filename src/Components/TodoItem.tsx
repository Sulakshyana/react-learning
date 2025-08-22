import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Todo.css";

// Type for individual Todo
type TTodo = {
  id: number;
  text: string;
  completed: boolean;
};

// Type for temporary input state (when adding/editing)
type TTodoInput = {
  id: number | null;
  text: string;
};

// Type for filter
type TFilter = "all" | "completed" | "notCompleted";

function Todo() {
  // State for list of todos
  const [todos, setTodos] = useState<TTodo[]>([]);

  // State for current input (add/edit)
  const [currentTodo, setCurrentTodo] = useState<TTodoInput>({
    id: null,
    text: "",
  });

  // State for filtering
  const [filter, setFilter] = useState<TFilter>("all");

  // Ref for input focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus input whenever editing is triggered
  useEffect(() => {
    if (currentTodo.id !== null) {
      inputRef.current?.focus();
    }
  }, [currentTodo]);

  //Add a new todo OR update an existing one //
  const handleSaveTodo = () => {
    if (!currentTodo.text.trim()) return; // Prevent empty input

    if (currentTodo.id !== null) {
      // Update existing todo
      setTodos((prev) =>
        prev.map((t) =>
          t.id === currentTodo.id ? { ...t, text: currentTodo.text } : t
        )
      );
    } else {
      // Add new todo
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), text: currentTodo.text, completed: false },
      ]);
    }

    // Reset input
    setCurrentTodo({ id: null, text: "" });
  };

  //Toggle completed state
  const handleToggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete todo
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Handle Enter key for add/update
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveTodo();
    }
  };

  // Filter todos based on selected filter

  const getFilteredTodos = () => {
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.completed);
      case "notCompleted":
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <>
      <div>
        {" "}
        <Link to="/">Home</Link>
      </div>
      <div className="todo-container">
        <h2 className="todo-title">Todo List</h2>

        {/* Input section */}
        <div className="todo-input-section">
          <input
            type="text"
            ref={inputRef}
            value={currentTodo.text}
            placeholder="Add new task..."
            className="todo-input"
            onChange={(e) =>
              setCurrentTodo({ ...currentTodo, text: e.target.value })
            }
            onKeyDown={handleKeyPress}
          />
          <button
            type="button"
            className="todo-btn add-btn"
            onClick={handleSaveTodo}
          >
            {currentTodo.id !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Filter buttons */}
        <div className="filter-section">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${
              filter === "notCompleted" ? "active" : ""
            }`}
            onClick={() => setFilter("notCompleted")}
          >
            Not Completed
          </button>
        </div>

        <h3 className="todo-subtitle">Your Tasks</h3>

        {/* Todo list */}
        {todos.length === 0 ? "Todo List is Empty" : null}
        <ol className="todo-list">
          {filteredTodos.map((task, index) => (
            <li key={task.id} className="todo-item">
              {/* Serial number */}
              <span className="serial">{index + 1}.</span>

              {/* Task text */}
              <span
                className={task.completed ? "task-text completed" : "task-text"}
              >
                {task.text}
              </span>

              {/* Actions */}
              <div className="todo-actions">
                {!task.completed && (
                  <button
                    type="button"
                    className="todo-btn edit-btn"
                    onClick={() =>
                      setCurrentTodo({ id: task.id, text: task.text })
                    }
                  >
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  className="todo-btn complete-btn"
                  onClick={() => handleToggleCompleted(task.id)}
                >
                  {task.completed ? "Completed" : "Mark Complete"}
                </button>

                <button
                  type="button"
                  className="todo-btn delete-btn"
                  onClick={() => handleDeleteTodo(task.id)}
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
}

export default Todo;
