import { useState, useEffect } from "react";

function Timer({ isRunning, onTimeUpdate, shouldReset }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (shouldReset || !isRunning) {
      setTime(0);
    }
  }, [shouldReset, isRunning]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const newTime = time + 1;
        setTime(newTime);
        onTimeUpdate(newTime);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time, onTimeUpdate]);

  return (
    <div>
      <p>Время: {time}</p>
    </div>
  );
}


export default Timer;
