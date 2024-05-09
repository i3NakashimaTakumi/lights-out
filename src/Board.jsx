import Square from "./Square";
import PropTypes from "prop-types";

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default function Board({ squares, onPlay, counter }) {
  function handleClick(i) {
    squares[i] === 1 ? (squares[i] = 0) : (squares[i] = 1);

    // 上端以外
    if (5 <= i) {
      squares[i - 5] === 1 ? (squares[i - 5] = 0) : (squares[i - 5] = 1);
    }
    // 左端以外
    if (i % 5 !== 0) {
      squares[i - 1] === 1 ? (squares[i - 1] = 0) : (squares[i - 1] = 1);
    }
    // 右端以外
    if (i % 5 !== 4) {
      squares[i + 1] === 1 ? (squares[i + 1] = 0) : (squares[i + 1] = 1);
    }
    // 下端以外
    if (i < 20) {
      squares[i + 5] === 1 ? (squares[i + 5] = 0) : (squares[i + 5] = 1);
    }

    counter++;

    onPlay([...squares], counter);
  }

  const boardRow = [];

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
