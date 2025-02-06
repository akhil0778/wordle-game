import React, { useContext } from "react";
import { AppContext } from "../../App";
import Letter from "../Letter";

const Board = () => {
  const { board } = useContext(AppContext);

  return (
    <div className="board">
      {board.map((row, attemptVal) => (
        <div className="row" key={attemptVal}>
          {row.map((_, letterPos) => (
            <Letter key={letterPos} letterPos={letterPos} attemptVal={attemptVal} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
