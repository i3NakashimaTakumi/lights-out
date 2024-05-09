import { useState } from "react";
import "./App.css";
import Board from "./Board";
import Stopwatch from "./Stopwatch";

export default function Game() {
  const [history, setHistory] = useState(Array(25).fill(0));
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handlePlay(nextSquares, nextCount) {
    setHistory(nextSquares);
    setCount(nextCount);
  }

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

  return (
    <div className="game">
      <header className="status">
        <div className="counter">count: {count}</div>
        <div className="timer">
          time: {hours}:{minutes}:{seconds}:{milliseconds}
        </div>
      </header>
      <div className="game-board">
        <Board squares={history} onPlay={handlePlay} counter={count} />
        <Stopwatch
          setTime={setTime}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />
      </div>
    </div>
  );
}
