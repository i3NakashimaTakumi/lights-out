import PropTypes from "prop-types";
import "./Menu.css";
import { useState } from "react";
import MenuItem from "../MenuItem/MenuItem";

Menu.propTypes = {
  handleStart: PropTypes.func.isRequired,
  selectMode: PropTypes.func.isRequired,
};

export default function Menu({ handleStart, selectMode }) {
  const [iconClass, setIconClass] = useState("menu-item");

  const menuItems = [];

  for (let index = 3; index < 11; index++) {
    menuItems.push(
      <MenuItem key={index} iconClass={iconClass} selectMode={selectMode} value={index} />
    );
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
        {menuItems}
      </ul>
    </div>
  );
}
