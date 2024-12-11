import { useState } from "react";
import "./App.css";
import Board from "./components/board";

function App() {
  const [start, setStart] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      {start ? (
        <>
          <Board />
        </>
      ) : (
        <div className="bg-[#eee] shadow-lg w-[340px] lg:w-[600px] h-[40vh] flex justify-center items-center flex-col gap-5">
          <h2 className="text-2xl">Sudoku Game</h2>
          <button
            className="bg-green-500  rounded-md shadow-md hover:bg-green-600 w-36 p-2"
            onClick={() => setStart(true)}
          >
            start
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
