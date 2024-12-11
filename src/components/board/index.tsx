import { useEffect, useState, useRef } from "react";
import { boardRandom } from "../../utils/SudokuBoards";
import { isSudokuValid } from "../../utils//validateSudoku.test";
import { difficultyProp } from "../../type";
import LeveleSelect from "../LevelSelector/index.tsx";
import Swal from "sweetalert2";

const Board = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
  const [difficulty, setDifficulty] = useState<difficultyProp>("easy");
  const [activeCell, setActiveCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  const generateNewBoard = () => {
    const boardDefault =
      boardRandom[difficulty][
        Math.floor(Math.random() * boardRandom[difficulty].length)
      ];

    const newBoard = JSON.parse(JSON.stringify(boardDefault));
    setActiveCell(null);
    setBoard(newBoard);
    setFixedCells(
      newBoard.map((row: number[]) => row.map((cell: number) => cell !== 0))
    );
  };

  useEffect(() => {
    generateNewBoard();
  }, [difficulty]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        boardRef.current &&
        !boardRef.current.contains(event.target as Node)
      ) {
        setActiveCell(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) {
    // setActiveCell(null);
    const value = e.target.value;

    if (value === "" || /^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = value ? parseInt(value) : 0;
      setBoard(newBoard);
    }
  }

  const chekSolution = () => {
    setActiveCell(null);
    if (isSudokuValid(board)) {
      Swal.fire({
        icon: "success",
        title: "Well done!",
        text: "Your solution is correct!",
        confirmButtonColor: "#4CAF50",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Your solution is incorrect. Please try again!",
        confirmButtonColor: "#F44336",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-wrap">
      <div ref={boardRef} className="grid grid-cols-9 gap-0 w-fit shadow-md">
        {board.map((_, row) =>
          board[row].map((cell, col) => (
            <input
              key={`${row}-${col}`}
              type="text"
              value={cell !== 0 ? cell : ""}
              onChange={(e) => handleChange(e, row, col)}
              onFocus={() => setActiveCell({ row, col })}
              className={`${
                fixedCells[row][col] ? "bg-gray-200" : ""
              } appearance-none border text-[18px] lg:text-2xl border-blue-600 w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500
  ${row % 3 === 0 ? "border-t-2" : ""}
  ${col % 3 === 0 ? "border-l-2" : ""}
  ${row === board.length - 1 ? "border-b-2" : ""}
  ${col === board[row].length - 1 ? "border-r-2" : ""}
  ${
    activeCell && activeCell.row === row && activeCell.col === col
      ? "bg-orange-300"
      : ""
  }
  ${
    activeCell &&
    (activeCell.row === row ||
      activeCell.col === col ||
      (Math.floor(activeCell.row / 3) === Math.floor(row / 3) &&
        Math.floor(activeCell.col / 3) === Math.floor(col / 3)))
      ? "bg-orange-100"
      : ""
  } ${
                board[row][col] !== 0 &&
                activeCell &&
                board[row][col] === board[activeCell.row][activeCell.col] &&
                (row === activeCell.row ||
                  col === activeCell.col ||
                  (Math.floor(row / 3) === Math.floor(activeCell.row / 3) &&
                    Math.floor(col / 3) === Math.floor(activeCell.col / 3)))
                  ? "bg-red-400"
                  : ""
              }
              `}
              disabled={fixedCells[row][col]}
            />
          ))
        )}
      </div>

      <div className="flex flex-col justify-center items-center w-60 gap-2">
        <div>
          <LeveleSelect difficulty={difficulty} setDifficulty={setDifficulty} />
        </div>
        <button
          onClick={generateNewBoard}
          className="bg-red-400 hover:bg-red-500 w-40 p-2 rounded-md shadow-lg cursor-pointer"
        >
          Restart
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 rounded-md w-40 shadow-lg p-2 m-2 cursor-pointer"
          onClick={chekSolution}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Board;
