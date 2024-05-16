import PropTypes from "prop-types";
import "./Menu.css";
import { useState } from "react";
import MenuItem from "../MenuItem/MenuItem";

Menu.propTypes = {
  handleStart: PropTypes.func.isRequired,
  selectMode: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  setIsRunning: PropTypes.func.isRequired,
};

export default function Menu({ handleStart, selectMode, rowCount, isRunning, setIsRunning }) {
  const [iconClass, setIconClass] = useState("menu-item");

  const menuItems = [];

  for (let index = 3; index < 11; index++) {
    menuItems.push(
      <MenuItem
        key={index}
        iconClass={iconClass}
        selectMode={selectMode}
        value={index}
        rowCount={rowCount}
      />
    );
  }

  return (
    <div className="menu-container">
      <ul id="menu">
        {isRunning ? (
          <a
            className="menu-button icon-plus disable"
            href="#menu"
            onClick={() => {
              setIconClass("menu-item visible");
              setIsRunning(false);
            }}
          >
            Stop
          </a>
        ) : (
          <a
            className="menu-button icon-plus"
            href="#menu"
            onClick={() => setIconClass("menu-item visible")}
          >
            Menu
          </a>
        )}
        <a
          className="menu-button icon-minus"
          href="#none"
          onClick={() => {
            setIconClass("menu-item invisible");
            handleStart();
          }}
        >
          Start
        </a>
        {menuItems}
      </ul>
    </div>
  );
}
