import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const MinCount = -10;
const MaxCount = 10;

function Counter() {
  const [count, setCount] = useState(0);

  const addcount = () => {
    console.log("reached addcount", "prevCount");

    setCount((prevCount) => {
      console.log("reached setCount", prevCount);

      if (prevCount < MaxCount) {
        return prevCount + 1;
      } else {
        console.log("reached ");
        window.alert("you cannot add more than 10 todos");
        return prevCount;
      }
    });
  };
  
  function subtractcount() {
    setCount((prevCount) => {
      if (prevCount > MinCount) {
        return prevCount - 1;
      } else {
        window.alert("Sorry! You cannot go below -10 todos");
        return prevCount;
      }
    });
  }
  return (
    <div>
      <div className="row justify-content-end">
        <div className="col-4 d-flex justify-content-end mx-2">
          <h3 className="justify-content-center">Completed Task {count}</h3>
        </div>
        <div className="col-4 d-flex justify-content-end mx-2">
          <button className="me-2" onClick={addcount}>
            <FaPlus />
          </button>
          <button onClick={subtractcount}>
            <FaMinus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
