import { useReducer, useState } from "react";

type State = { count: number };
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "add"; payload: number }
  | { type: "reset" };

function reduce(state: State, action: Action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "add":
      return { count: state.count + action.payload };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

const initialState = { count: 0 };
function UseReducer() {
  const [state, dispatch] = useReducer(reduce, initialState);
  const [input, setInput] = useState<number>(0);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <input
        type="number"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(Number(e.target.value))
        }
      />
      <button onClick={() => dispatch({ type: "add", payload: input })}>
        +{input}
      </button>
    </>
  );
}
export default UseReducer;
