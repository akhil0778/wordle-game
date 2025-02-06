import { useContext } from "react";
import { AppContext } from "../../App";

const GameOver = () => {
  const { currAttempt, gameOver, correctWord, resetGame } = useContext(AppContext);

  return (
    <div className="gameOver">
      <h2>{gameOver.guessedWord ? "🎉 You Won! 🎉" : "❌ Game Over ❌"}</h2>
      <h3>
        {gameOver.guessedWord
          ? `You correctly guessed the word!`
          : "You failed to guess the word."}
      </h3>
      <h1 className="correct-word">Correct Word: <span>{correctWord.toUpperCase()}</span></h1>
      
      {gameOver.guessedWord && (
        <h3>You guessed it in {currAttempt.attempt} attempts 🎯</h3>
      )}
      
      <button onClick={resetGame} className="start-again-btn">
        🔄 Start Again
      </button>
    </div>
  );
};

export default GameOver;
