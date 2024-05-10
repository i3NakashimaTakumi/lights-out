import PropTypes from "prop-types";

Stopwatch.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

export default function Stopwatch({ isRunning, handleStart, handleReset }) {
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
