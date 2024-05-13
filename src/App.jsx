import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import Board from "./Board";
import Menu from "./Stopwatch";
import Header from "./ Header";

export default function Game() {
  const rowCount = 5;
  const [history, setHistory] = useState(Array(rowCount * rowCount).fill(0));
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isClear, setClear] = useState(false);

  function frame() {
    // 左から発射する紙吹雪の設定
    confetti({
      particleCount: 300,
      angle: 60,
      startVelocity: 60,
      spread: 55,
      origin: { x: 0 },
    });
    // 右から
    confetti({
      particleCount: 300,
      angle: 120,
      startVelocity: 60,
      spread: 55,
      origin: { x: 1 },
    });
  }

  function checkClear(squares) {
    // 全てのマスが光っているか
    const isSquaresValueOne = squares.every((value) => {
      return value === 1;
    });

    // 全てのマスが光っていたら
    if (isSquaresValueOne) {
      // タイム、操作ストップ
      setIsRunning(false);

      // 最後にクリックしたマスが光るアニメーションが終わってからisClear = true
      setTimeout(() => {
        setClear(true);
      }, 300);

      // クリア画面が出てから紙吹雪
      setTimeout(() => {
        frame();
      }, 2000);
    }
  }

  // クリックしたマスとその上下左右のマスの値を反転
  function switchSquareValue(history, i) {
    history[i] === 1 ? (history[i] = 0) : (history[i] = 1);

    // 上端以外
    if (rowCount <= i) {
      history[i - rowCount] === 1 ? (history[i - rowCount] = 0) : (history[i - rowCount] = 1);
    }
    // 左端以外
    if (i % rowCount !== 0) {
      history[i - 1] === 1 ? (history[i - 1] = 0) : (history[i - 1] = 1);
    }
    // 右端以外
    if (i % rowCount !== rowCount - 1) {
      history[i + 1] === 1 ? (history[i + 1] = 0) : (history[i + 1] = 1);
    }
    // 下端以外
    if (i < rowCount * (rowCount - 1)) {
      history[i + rowCount] === 1 ? (history[i + rowCount] = 0) : (history[i + rowCount] = 1);
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
    // ランダムな盤面を生成
    for (let i = 0; i < 50; i++) {
      switchSquareValue(history, Math.floor(Math.random() * rowCount * rowCount));
    }

    setHistory([...history]);

    setIsRunning(true);
  }

  function handleReset() {
    setIsRunning(false);
    setCount(0);
    setTime(0);
  }

  function handleReStart() {
    setHistory(Array(rowCount * rowCount).fill(0));
    setClear(false);
    setTime(0);
    setCount(0);
  }

  return (
    <div className="game">
      <Header
        isRunning={isRunning}
        count={count}
        setCount={setCount}
        time={time}
        setTime={setTime}
      />
      <div className="game-board">
        {isClear && (
          <div className="clear">
            <p>Congratulations! Thank You For Playing!</p>
            <button onClick={handleReStart}>ReStart</button>
          </div>
        )}
        <Board squares={history} handleClick={handleClick} rowCount={rowCount} />
        <Menu isRunning={isRunning} handleStart={handleStart} handleReset={handleReset} />
      </div>
    </div>
  );
}
