import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

const App = () => {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");

  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    const { wordSet, todaysWord } = await generateWordSet();
    console.log("Fetched words:", wordSet, "Today's word:", todaysWord);
    setWordSet(new Set(wordSet));
    setCorrectWord(todaysWord.trim().toLowerCase());
  };


    const resetGame = () => {
      window.location.reload();
    };


  const onEnter = () => {
    if (currAttempt.letter < 5) return;

    let currWord = board[currAttempt.attempt].join("").toLowerCase();
    console.log("Checking word:", currWord);

    let newDisabledLetters = [...disabledLetters];
    let letterStatus = Array(5).fill("error");

    let correctWordArr = correctWord.split("");

    for (let i = 0; i < 5; i++) {
      if (currWord[i] === correctWord[i]) {
        letterStatus[i] = "correct";
        correctWordArr[i] = null;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (letterStatus[i] === "correct") continue;
      if (correctWordArr.includes(currWord[i])) {
        letterStatus[i] = "almost";
        correctWordArr[correctWordArr.indexOf(currWord[i])] = null;
      } else {
        newDisabledLetters.push(currWord[i]);
      }
    }

    setDisabledLetters(newDisabledLetters);
    setCurrAttempt((prevAttempt) => ({ attempt: prevAttempt.attempt + 1, letter: 0 }));

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter + 1 });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          resetGame
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default App;
