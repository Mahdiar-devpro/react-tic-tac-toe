import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import { WINNING_COMBINATION } from "./Components/Winning-Combinations";
import GameOver from "./Components/GameOver";

let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function handleChangeTurns(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectCels(row, col) {
    if (winner || hasDraw) return;

    setGameTurns((prevGameTurns) => {
      let updatedPlayer = handleChangeTurns(prevGameTurns);
      return [
        { square: { row: row, col: col }, player: updatedPlayer },
        ...prevGameTurns,
      ];
    });
  }

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  const activePlayer = handleChangeTurns(gameTurns);

  let winner;
  for (const combination of WINNING_COMBINATION) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
      break;
    }
  }
  let hasDraw = !winner && gameTurns.length === 9;

  function handleReMatchButton() {
    setGameTurns([]);
  }

  return (
    <main>
      <div className="players">
        <Player
          initialPlayerName="PLAYER 1"
          initialPlayerSymbol="X"
          isActive={activePlayer === "X"}
        />
        <Player
          initialPlayerName="PLAYER 2"
          initialPlayerSymbol="O"
          isActive={activePlayer === "O"}
        />
      </div>
      <div className="main-game">
        <GameBoard onClickSquare={handleSelectCels} board={gameBoard} />
        {(winner || hasDraw) && (
          <GameOver atTheEndWinner={winner} reStart={handleReMatchButton} />
        )}
      </div>
    </main>
  );
}

export default App;
