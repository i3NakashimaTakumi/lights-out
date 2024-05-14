import PropTypes from "prop-types";
import "./Menu.css";
import { useState } from "react";

Menu.propTypes = {
  handleStart: PropTypes.func.isRequired,
  selectMode: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Menu({ handleStart, selectMode, rowCount }) {
  const [iconClass, setIconClass] = useState("menu-item");
  function checkDisabled(number) {
    return rowCount === number;
  }

  return (
    <div className="menu-container">
      <ul id="menu">
        <a
          className="menu-button icon-plus"
          href="#menu"
          onClick={() => setIconClass("menu-item visible")}
        >
          Menu
        </a>
        <a
          className="menu-button icon-minus"
          href="#none"
          onClick={() => {
            setIconClass("menu-item invisible");
            handleStart();
          }}
        >
          <div className="menu-text">
            <p>Start</p>
            <p className="back">×</p>
          </div>
        </a>
        <li className={iconClass} disabled={checkDisabled(2)} onClick={() => selectMode(2)}>
          2 × 2
        </li>
        <li className={iconClass} disabled={checkDisabled(3)} onClick={() => selectMode(3)}>
          3 × 3
        </li>
        <li className={iconClass} disabled={checkDisabled(4)} onClick={() => selectMode(4)}>
          4 × 4
        </li>
        <li className={iconClass} disabled={checkDisabled(5)} onClick={() => selectMode(5)}>
          5 × 5
        </li>
        <li className={iconClass} disabled={checkDisabled(6)} onClick={() => selectMode(6)}>
          6 × 6
        </li>
        <li className={iconClass} disabled={checkDisabled(7)} onClick={() => selectMode(7)}>
          7 × 7
        </li>
        <li className={iconClass} disabled={checkDisabled(8)} onClick={() => selectMode(8)}>
          8 × 8
        </li>
        <li className={iconClass} disabled={checkDisabled(9)} onClick={() => selectMode(9)}>
          9 × 9
        </li>
      </ul>
    </div>
  );
}
