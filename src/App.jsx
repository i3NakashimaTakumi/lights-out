import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

Square.propTypes = {
  value: PropTypes.number,
  onSquareClick: PropTypes.func.isRequired,
};

function Square({ value, onSquareClick }) {
  const className = value === 1 ? "square on" : "square";
  return <button className={className} onClick={onSquareClick}></button>;
}

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  onPlay: PropTypes.func.isRequired,
};

function Board({ squares, onPlay }) {
  function handleClick(i) {
    squares[i] === 1 ? (squares[i] = 0) : (squares[i] = 1);

    // !上端
    if (!(0 <= i && i <= 4)) {
      squares[i - 5] === 1 ? (squares[i - 5] = 0) : (squares[i - 5] = 1);
    }
    // !左端
    if (!(i % 5 === 0)) {
      squares[i - 1] === 1 ? (squares[i - 1] = 0) : (squares[i - 1] = 1);
    }
    // !右端
    if (!(i % 5 === 4)) {
      squares[i + 1] === 1 ? (squares[i + 1] = 0) : (squares[i + 1] = 1);
    }
    // !下端
    if (!(20 <= i && i <= 24)) {
      squares[i + 5] === 1 ? (squares[i + 5] = 0) : (squares[i + 5] = 1);
    }

    onPlay([...squares]);
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

export default function Game() {
  const [history, setHistory] = useState(Array(25).fill(0));

  function handlePlay(nextSquares) {
    setHistory(nextSquares);
  }

  return (
    <div className="game">
      <header className="status"></header>
      <div className="container">
        <div className="game-board">
          <Board squares={history} onPlay={handlePlay} />
        </div>
      </div>
    </div>
  );
}
