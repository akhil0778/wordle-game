import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";

const Letter = ({ letterPos, attemptVal }) => {
  const { board, setDisabledLetters, currAttempt, correctWord } = useContext(AppContext);
  
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  
  const letterState = 
    currAttempt.attempt > attemptVal 
      ? correct 
        ? "correct" 
        : almost 
          ? "almost" 
          : "error" 
      : "";

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => {
        if (!prev.includes(letter)) {
          return [...prev, letter];
        }
        return prev;
      });
    }
  }, [letter, correct, almost, setDisabledLetters]);

  return (
    <div className={`letter ${letterState}`}>
      {letter}
    </div>
  );
}

export default Letter;
