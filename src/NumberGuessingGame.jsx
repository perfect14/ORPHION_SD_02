import { useState, useEffect } from "react";
import "./NumberGuessingGame.css";

function NumberGuessingGame() {
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("Guess a number between 1 and 100!");
  const [gameOver, setGameOver] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);

  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(newNumber);
    setGuess("");
    setAttempts(0);
    setMessage("Guess a number between 1 and 100!");
    setGameOver(false);
    setGuessHistory([]);
  };

  const handleGuess = () => {
    // Validate input
    if (!guess.trim()) {
      setMessage("⚠️ Please enter a number!");
      return;
    }

    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess)) {
      setMessage("⚠️ Please enter a valid number!");
      return;
    }

    if (userGuess < 1 || userGuess > 100) {
      setMessage("⚠️ Number must be between 1 and 100!");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory([...guessHistory, userGuess]);

    if (userGuess === secretNumber) {
      setMessage(
        `🎉 Correct! You guessed it in ${newAttempts} attempt${newAttempts !== 1 ? "s" : ""}!`,
      );
      setGameOver(true);
    } else if (newAttempts >= 3) {
      setMessage(
        `😔 Game Over! The correct answer was ${secretNumber}. Better luck next time!`,
      );
      setGameOver(true);
    } else if (userGuess < secretNumber) {
      setMessage(`📈 Too Low! Try again. (Attempt ${newAttempts}/3)`);
    } else {
      setMessage(`📉 Too High! Try again. (Attempt ${newAttempts}/3)`);
    }

    setGuess("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !gameOver) {
      handleGuess();
    }
  };

  return (
    <div className="game-container">
      <h1>🎮 Number Guessing Game</h1>

      <div className="game-card">
        <div className="instructions">
          <p>I've thought of a number between 1 and 100.</p>
          <p>Can you guess it? (You have 3 attempts!)</p>
        </div>

        <div
          className="message-box"
          className={`message-box ${gameOver ? "win" : ""}`}
        >
          {message}
        </div>

        <div className="input-section">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your guess..."
            disabled={gameOver}
            min="1"
            max="100"
            className="guess-input"
          />
          <button
            onClick={handleGuess}
            disabled={gameOver}
            className="guess-button"
          >
            {gameOver ? "Game Over" : "Guess"}
          </button>
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Attempts:</span>
            <span className="stat-value">{attempts}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Guesses:</span>
            <span className="stat-value">
              {guessHistory.length > 0 ? guessHistory.join(", ") : "None yet"}
            </span>
          </div>
        </div>

        {gameOver && (
          <button onClick={resetGame} className="reset-button">
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default NumberGuessingGame;
