import { useEffect, useState } from "react";

function AutoCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const MaxCount = 10;

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning && count < MaxCount)
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < MaxCount) {
            return prevCount + 1;
          } else {
            return prevCount;
          }
        });
      }, 1000);
    if (count >= MaxCount && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isRunning, count]);

  const toggleCounter = () => {
    if (!isRunning && count >= MaxCount) {
      setCount(0);
    }
    setIsRunning((prev) => !prev);
  };
  return (
    <div>
      <h2>Automatic Counter</h2>
      <h3>{count}</h3>
      <button onClick={toggleCounter}>{isRunning ? "stop" : "start"}</button>
    </div>
  );
}

export default AutoCounter;
