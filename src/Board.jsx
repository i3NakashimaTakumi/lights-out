import Square from "./Square";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Board({ squares, handleClick, rowCount }) {
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
