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
    if (
      squares.every((value) => {
        return value === 1;
      })
    ) {
      setIsRunning(false);
      setClear(true);
      clearInterval(intervalRef.current);
    }
  }

  function handlePlay(nextSquares, nextCount) {
    setHistory(nextSquares);
    setCount(nextCount);
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
            <button>Restart</button>
          </div>
        )}
        <Board
          squares={history}
          onPlay={handlePlay}
          counter={count}
          checkClear={checkClear}
          isRunning={isRunning}
        />
        <Stopwatch
          setTime={setTime}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          intervalRef={intervalRef}
          setHistory={setHistory}
        />
      </div>
    </div>
  );
}
