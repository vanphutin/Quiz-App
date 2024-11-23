// useTimer.js
import { useEffect, useState } from "react";

const useTimer = (initialTime, onTimeUp) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    setTimer(initialTime); // Reset timer when initial time changes

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalId); // Stop the timer
          onTimeUp(); // Call the time-up callback
          return 0; // Ensure timer doesn't go below 0
        }
        return prevTimer - 1; // Decrease the timer
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [initialTime, onTimeUp]);

  return timer; // Return the current timer value
};

export default useTimer;
