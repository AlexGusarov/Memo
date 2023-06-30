import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/system';

function Timer({ isRunning, onTimeUpdate, shouldReset, onReset }) {
  const [time, setTime] = useState(0);

  const TimerBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '50px',
    width: '150px',
    height: '50px',
  })

  // This effect handles the timer logic
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

  // This effect handles the reset
  useEffect(() => {
    if (shouldReset) {
      setTime(0);
      onTimeUpdate(0); // To ensure the parent state also gets updated
      onReset(); // Notify the parent that the reset is complete
    }
  }, [shouldReset, onTimeUpdate, onReset]);

  return (
    <div>
      <p>Время: {time}</p>
    </div>
  );
}

export default Timer;
