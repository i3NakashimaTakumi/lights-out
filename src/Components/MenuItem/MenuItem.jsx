import PropTypes from "prop-types";
import "./MenuItem.css";
import { useEffect, useState } from "react";

MenuItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  selectMode: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function MenuItem({ iconClass, selectMode, value, rowCount }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const style = `#menu:target .menu-item:nth-child(${value}) {
        transform: rotate(${(value - 3) * 45}deg) translateY(-12vw) rotate(-${(value - 3) * 45}deg);
    }`;

  // スタイル要素を生成してドキュメントのheadに追加（ページ全体に適用）
  const styleSheet = document.createElement("style");
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);

  useEffect(() => {
    value === rowCount ? setIsDisabled(true) : setIsDisabled(false);
  }, [rowCount, value]);

  const className = isDisabled ? "disabled" : "able";

  return (
    <li style={{ style }} className={iconClass}>
      <button style={{ className }} disabled={isDisabled} onClick={() => selectMode(value)}>
        {value} × {value}
      </button>
    </li>
  );
}
