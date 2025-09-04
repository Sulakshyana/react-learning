import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <header className="text-white p-3">
        <h1>
          <i className="bi bi-journal-check"></i> Todo list
        </h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/count">Count</Link>
          </li>
          <li>
            <Link to="/auto-counter">Auto Counter</Link>
          </li>
          <li>
            <Link to="/input-field">Input Field</Link>
          </li>
          <li>
            <Link to="/input-field-2">Input Field refactor</Link>
          </li>
          <li>
            <Link to="/input-field-2">Input Field using UseRef</Link>
          </li>
          <li>
            <Link to="/todo-list">Todo List</Link>
          </li>
          <li>
            <Link to="/useReducer-todo-list">useReducer Todo List</Link>
          </li>
          <li>
            <Link to="/props-drilling">Carts</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Home;

// Empty todos allowed → No validation in "add". 10

// Update overwrites all todos instead of just one. 10

// Delete mutates state directly using splice. 9

// Toggle compares id vs index incorrectly (wrong todo toggled). 10

// Filter adds a trailing space → "completed " instead of "completed". 10

// useEffect missing dependency → input not refocused on edit. 9

// Enter key uses deprecated keyCode instead of key 10.

// Update uses wrong fallback id (1) if id is null. 10

// Input uncontrolled (defaultValue instead of value). 5

// Key uses index → rendering bugs when reordering/deleting 0
