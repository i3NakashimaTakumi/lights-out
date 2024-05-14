import PropTypes from "prop-types";
import "./Menu.css";
import { useState } from "react";

Menu.propTypes = {
  handleStart: PropTypes.func.isRequired,
  selectMode: PropTypes.func.isRequired,
};

export default function Menu({ handleStart, selectMode }) {
  const [iconClass, setIconClass] = useState("menu-item");

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
        <li className={iconClass} onClick={() => selectMode(3)}>
          3 × 3
        </li>
        <li className={iconClass} onClick={() => selectMode(4)}>
          4 × 4
        </li>
        <li className={iconClass} onClick={() => selectMode(5)}>
          5 × 5
        </li>
        <li className={iconClass} onClick={() => selectMode(6)}>
          6 × 6
        </li>
        <li className={iconClass} onClick={() => selectMode(7)}>
          7 × 7
        </li>
        <li className={iconClass} onClick={() => selectMode(8)}>
          8 × 8
        </li>
        <li className={iconClass} onClick={() => selectMode(9)}>
          9 × 9
        </li>
        <li className={iconClass} onClick={() => selectMode(10)}>
          10 × 10
        </li>
      </ul>
    </div>
  );
}
