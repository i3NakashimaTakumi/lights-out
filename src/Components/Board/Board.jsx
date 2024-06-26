import Square from "../Square/Square";
import PropTypes from "prop-types";
import "./Board.css";

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default function Board({ squares, handleClick, rowCount, isRunning }) {
  const boardRow = [];

  // 5*5の形にSquareを生成
  for (let row = 0; row < rowCount; row++) {
    const squaresInRow = [];
    for (let col = 0; col < rowCount; col++) {
      const squareIndex = row * rowCount + col;
      squaresInRow.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => {
            handleClick(squareIndex);
          }}
        />
      );
    }

    boardRow.push(
      <div
        key={row}
        style={{
          display: "flex",
          height: `calc(100% / ${rowCount})`,
        }}
      >
        {squaresInRow}
      </div>
    );
  }

  const className = isRunning ? "board" : "board stop";

  return (
    <>
      <div className={className}>{boardRow}</div>
    </>
  );
}
