import PropTypes from "prop-types";

Stopwatch.propTypes = {
  setTime: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  setIsRunning: PropTypes.func.isRequired,
  intervalRef: PropTypes.object.isRequired,
  setHistory: PropTypes.func.isRequired,
};

export default function Stopwatch({ setTime, isRunning, setIsRunning, intervalRef, setHistory }) {
  function handleStart() {
    const randomHistory = [];
    for (let index = 0; index < 25; index++) {
      randomHistory.push(Math.floor(Math.random() * 2));
    }
    setHistory(randomHistory);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  }

  return (
    <div className="stopwatch">
      {isRunning ? (
        <button onClick={handleReset}>Reset</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
    </div>
  );
}
