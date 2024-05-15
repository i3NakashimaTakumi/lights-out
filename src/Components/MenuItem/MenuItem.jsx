import PropTypes from "prop-types";
import "./MenuItem.css";

MenuItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  selectMode: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default function MenuItem({ iconClass, selectMode, value }) {
  return (
    <li className={iconClass} onClick={() => selectMode(value)}>
      {value} × {value}
    </li>
  );
}
