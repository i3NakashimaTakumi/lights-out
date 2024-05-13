import Square from "./Square";
import PropTypes from "prop-types";

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default function Board({ squares, handleClick }) {
  const boardRow = [];

  // 5*5の形にSquareを生成
  for (let row = 0; row < 5; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 5; col++) {
      const squareIndex = row * 5 + col;
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
      <div key={row} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="board">{boardRow}</div>
    </>
  );
}
