import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/system';


function Timer({ isRunning, onTimeUpdate, shouldReset, onReset }) {
  const [time, setTime] = useState(0);

  const TimerBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '000',
    borderRadius: '50px',
    width: '50px',
    height: '50px',
    fontSize: '18px',
    boxShadow: 'inset 0px 0px 10px 5px rgba(207, 181, 59, 0.5)'
  })

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


  useEffect(() => {
    if (shouldReset) {
      setTime(0);
      onTimeUpdate(0);
      onReset();
    }
  }, [shouldReset, onTimeUpdate, onReset]);

  return (
    <div>
      <TimerBox>{time}</TimerBox>
    </div>
  );
}

export default Timer;
