import { useState, useRef } from "react";
import "./App.css";
import Board from "./Board";
import Stopwatch from "./Stopwatch";

export default function Game() {
  const [history, setHistory] = useState(Array(25).fill(0));
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isClear, setClear] = useState(false);
  const intervalRef = useRef(0);

  function checkClear(squares) {
    const isSquaresValueOne = squares.every((value) => {
      return value === 1;
    });
    if (isSquaresValueOne) {
      setIsRunning(false);
      setClear(true);
      clearInterval(intervalRef.current);
    }
  }

  function handleClick(i) {
    if (isRunning !== true) {
      alert("Startボタンを押してください");
      return;
    }

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

    setHistory([...history]);
    setCount(count + 1);

    checkClear(history);
  }

  function handleStart() {
    const randomHistory = [];

    for (let index = 0; index < 25; index++) {
      randomHistory.push(Math.floor(Math.random() * 2));
    }

    setHistory(randomHistory);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setCount(0);
  }

  function handleReStart() {
    setHistory(Array(25).fill(0));
    setClear(false);
    setTime(0);
    setCount(0);
  }

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000)}`.slice(-2);

  return (
    <div className="game">
      <header className="status">
        <div className="counter">count: {count}</div>
        <div className="timer">
          time: {minutes}:{seconds}:{milliseconds}
        </div>
      </header>
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
