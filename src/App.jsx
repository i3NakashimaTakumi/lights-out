import { useState } from "react";
import "./App.css";
import Board from "./Board";
import Stopwatch from "./Stopwatch";
import Header from "./ Header";

export default function Game() {
  const [history, setHistory] = useState(Array(25).fill(0));
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isClear, setClear] = useState(false);

  function checkClear(squares) {
    const isSquaresValueOne = squares.every((value) => {
      return value === 1;
    });
    if (isSquaresValueOne) {
      setIsRunning(false);

      setTimeout(() => {
        setClear(true);
      }, 300);
    }
  }

  function switchSquareValue(history, i) {
    history[i] === 1 ? (history[i] = 0) : (history[i] = 1);

    // 上端以外
    if (5 <= i) {
      history[i - 5] === 1 ? (history[i - 5] = 0) : (history[i - 5] = 1);
    }
    // 左端以外
    if (i % 5 !== 0) {
      history[i - 1] === 1 ? (history[i - 1] = 0) : (history[i - 1] = 1);
    }
    // 右端以外
    if (i % 5 !== 4) {
      history[i + 1] === 1 ? (history[i + 1] = 0) : (history[i + 1] = 1);
    }
    // 下端以外
    if (i < 20) {
      history[i + 5] === 1 ? (history[i + 5] = 0) : (history[i + 5] = 1);
    }
  }

  function handleClick(i) {
    if (isRunning !== true) {
      alert("Startボタンを押してください");
      return;
    }

    switchSquareValue(history, i);

    setHistory([...history]);
    setCount(count + 1);

    checkClear(history);
  }

  function handleStart() {
    for (let i = 0; i < 50; i++) {
      switchSquareValue(history, Math.floor(Math.random() * 25));
    }

    setHistory([...history]);

    setIsRunning(true);
  }

  function handleReset() {
    setIsRunning(false);
  }

  function handleReStart() {
    setHistory(Array(25).fill(0));
    setClear(false);
  }

  return (
    <div className="game">
      <Header isRunning={isRunning} count={count} setCount={setCount} />
      <div className="game-board">
        {isClear && (
          <div className="clear">
            <p>Game Clear! Thank You For Playing!</p>
            <button onClick={handleReStart}>ReStart</button>
          </div>
        )}
        <Board squares={history} handleClick={handleClick} />
        <Stopwatch isRunning={isRunning} handleStart={handleStart} handleReset={handleReset} />
      </div>
    </div>
  );
}
