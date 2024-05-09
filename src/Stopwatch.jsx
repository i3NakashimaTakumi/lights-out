import PropTypes from "prop-types";

Stopwatch.propTypes = {
  setTime: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  setIsRunning: PropTypes.func.isRequired,
  intervalRef: PropTypes.number.isRequired,
};

export default function Stopwatch({ setTime, isRunning, setIsRunning, intervalRef }) {
  function handleStart() {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  }

  return (
    <div className="stopwatch">
      {isRunning ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
