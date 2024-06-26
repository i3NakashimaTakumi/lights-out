import { useCallback, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "destyle.css/destyle.css";
import "./App.css";
import Board from "./Components/Board/Board";
import Menu from "./Components/Menu/Menu";
import Header from "./Components/Header/Header";

export default function App() {
  const [rowCount, setRowCount] = useState(5);
  const [history, setHistory] = useState(Array(rowCount * rowCount).fill(1));
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isClear, setClear] = useState(false);

  // クリックしたマスとその上下左右のマスの値を反転
  const switchSquareValue = useCallback(
    (history, i) => {
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
    },
    [rowCount]
  );

  // ランダムな盤面生成
  const getRandomSquares = useCallback(
    (squares) => {
      let isAllOut = true;

      while (isAllOut) {
        for (let i = 0; i < 50; i++) {
          switchSquareValue(squares, Math.floor(Math.random() * rowCount * rowCount));
        }

        isAllOut = squares.every((value) => {
          return value === 0;
        });
      }

      return squares;
    },
    [rowCount, switchSquareValue]
  );

  const reset = useCallback(() => {
    setHistory(getRandomSquares(Array(rowCount * rowCount).fill(1)));
    setTime(0);
    setCount(0);
  }, [getRandomSquares, rowCount]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handleReStart = useCallback(() => {
    setClear(false);
    reset();
  }, [reset]);

  useEffect(() => {
    reset();
  }, [reset]);

  function frame() {
    // 左から発射する紙吹雪の設定
    confetti({
      particleCount: 400,
      angle: 60,
      startVelocity: 80,
      spread: 55,
      origin: { x: 0 },
    });
    // 右から
    confetti({
      particleCount: 400,
      angle: 120,
      startVelocity: 80,
      spread: 55,
      origin: { x: 1 },
    });
  }

  function checkClear(squares) {
    // 全てのマスが光っているか
    const isSquaresValueOne = squares.every((value) => {
      return value === 0;
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

  function selectMode(row) {
    setRowCount(row);
  }

  function handleClick(i) {
    if (isRunning !== true) {
      return;
    }

    switchSquareValue(history, i);

    setHistory([...history]);
    setCount(count + 1);

    checkClear(history);
  }

  return (
    <div className="game">
      <Header isRunning={isRunning} count={count} time={time} setTime={setTime} />
      <div className="game-board">
        {isClear && (
          <div
            className="clear"
            style={{
              zIndex: "1",
            }}
          >
            <p>Congratulations! Thank You For Playing!</p>
            <p>
              mode: {rowCount} × {rowCount}
            </p>
            <button onClick={handleReStart}>ReStart</button>
          </div>
        )}
        <Board
          squares={history}
          handleClick={handleClick}
          rowCount={rowCount}
          isRunning={isRunning}
        />
        <Menu
          handleStart={handleStart}
          selectMode={selectMode}
          rowCount={rowCount}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />
      </div>
    </div>
  );
}
