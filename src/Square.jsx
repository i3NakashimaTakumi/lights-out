import PropTypes from "prop-types";

Square.propTypes = {
  value: PropTypes.number,
  onSquareClick: PropTypes.func.isRequired,
};

export default function Square({ value, onSquareClick }) {
  const className = value === 1 ? "square on" : "square";
  return <button className={className} onClick={onSquareClick}></button>;
}
