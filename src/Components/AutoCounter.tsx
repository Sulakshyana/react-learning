import { useEffect, useState } from "react";

const MaxCount = 10;
function AutoCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null;
    if (isRunning)
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < MaxCount) {
            return prevCount + 1;
          } else {
            return 0;
          }
        });
      }, 1000);
    else interval = null;

    // let interval: number | null = isRunning
    //   ? setInterval(() => setCount((p) => (p < MaxCount ? ++p : 0)), 1000)
    //   : null;

    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isRunning]);

  const toggleCounter = () => {
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
