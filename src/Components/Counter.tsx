import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

function Counter() {
  const [count, setcount] = useState(0);
  const MinCount = -10;
  const MaxCount = 10;
  function addcount() {
    setcount((prevcount) => {
      if (prevcount < MaxCount) {
        return prevcount + 1;
      } else {
        window.alert("you cannot add more than 10 todos");
        return prevcount;
      }
    });
  }
  function subtractcount() {
    setcount((prevcount) => {
      if (prevcount > MinCount) {
        return prevcount - 1;
      } else {
        window.alert("Sorry! You cannot go below -10 todos");
        return prevcount;
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
