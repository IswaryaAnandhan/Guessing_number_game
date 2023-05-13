import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"
const generateNumber = () => {
  const digits = [];
  while (digits.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join("");
};

const checkGuess = (number, guess) => {
  const plusMinus = [];
  console.log(number)
  for (let i = 0; i < 4; i++) {
    const digit = guess.charAt(i);
    if (digit === number.charAt(i)) {
      plusMinus.push("+");
    } else if (number.includes(digit)) {
      plusMinus.push("-");
    } else {
      plusMinus.push("*");
    }
  }
  return plusMinus;
};

const Guess = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [bestScores, setBestScores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/score").then((res) => {
      setBestScores(res.data);
    });
  }, []);

  const startGame = () => {
    setName(prompt("Enter your name:"));
    setNumber(generateNumber());
    setGuesses([]);
    setMessage("");
  };

  const makeGuess = () => {
    const plusMinus = checkGuess(number, guess);
    setGuesses([...guesses, { guess, plusMinus }]);
    if (plusMinus.every((pm) => pm === "+")) {
      setMessage(`Congratulations, ${name}! You guessed the number in ${guesses.length + 1} tries.`);
      axios.post("http://localhost:5000/api/score", { name, guesses: guesses.length + 1 }).then((res) => {
        setBestScores(res.data);
      });
    } else {
      setGuess("");
    }
  };

  return (
    <div>
      <h1 className="header">Number Guessing Game</h1>
      {name ? (
        <div>
         <div className="name">Hi {name}! </div>
         <p className="subtitle">Guess the four-digit number:</p>
         <form>
          <input className="input" value={guess} minLength={4} maxLength={4} onChange={(e) => setGuess(e.target.value)} required/>
          <button type="submit" className="guesses" onClick={makeGuess}>Guess</button>  
          </form>   
          <p className="previousguess">Previous guesses:</p>
          <ol className="list-group horizontal-list">
            {guesses.map((g, index) => (
              <li key={index}>
                {g.guess} - {g.plusMinus.join("")}
              </li>
            ))}
             </ol>
             {message &&(  
              <div className="message">
                  {message}   
           </div>  
        )}
      
          <h2 className="score">Top 10 Scores</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Guesses</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bestScores.map((score, i) => (
                <tr key={i}>
                  <td>{score.name}</td>
                  <td>{score.guesses}</td>
                  <td>{score.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  ) : (
    <div className="game">
    <button className="start" onClick={startGame}>Start Game</button>
    </div>
  )}
</div>
);
};

export default Guess;
