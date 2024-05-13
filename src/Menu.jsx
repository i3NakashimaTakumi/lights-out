import PropTypes from "prop-types";

Menu.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

export default function Menu({ isRunning, handleStart, handleReset }) {
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
