import PropTypes from "prop-types";

Menu.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  selectMode: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Menu({ isRunning, handleStart, handleReset, selectMode, rowCount }) {
  function checkDisabled(number) {
    return rowCount === number;
  }

  return (
    <div className="menu">
      {isRunning ? (
        <button onClick={handleReset}>Reset</button>
      ) : (
        <button onClick={handleStart}>Start</button>
      )}
      <button className="mode-button" disabled={checkDisabled(2)} onClick={() => selectMode(2)}>
        2 × 2
      </button>
      <button className="mode-button" disabled={checkDisabled(3)} onClick={() => selectMode(3)}>
        3 × 3
      </button>
      <button className="mode-button" disabled={checkDisabled(4)} onClick={() => selectMode(4)}>
        4 × 4
      </button>
      <button className="mode-button" disabled={checkDisabled(5)} onClick={() => selectMode(5)}>
        5 × 5
      </button>
      <button className="mode-button" disabled={checkDisabled(6)} onClick={() => selectMode(6)}>
        6 × 6
      </button>
      <button className="mode-button" disabled={checkDisabled(7)} onClick={() => selectMode(7)}>
        7 × 7
      </button>
    </div>
  );
}
