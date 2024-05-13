import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

Header.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default function Header({ isRunning, count, setCount, time, setTime }) {
  const intervalRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isRunning, setCount, setTime]);

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000)}`.slice(-2);

  return (
    <>
      <header className="status">
        <div className="counter">count: {count}</div>
        <div className="timer">
          time: {minutes}:{seconds}:{milliseconds}
        </div>
      </header>
    </>
  );
}
