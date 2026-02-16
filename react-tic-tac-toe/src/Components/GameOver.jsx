function GameOver({atTheEndWinner, reStart}) {
    return ( 
        <div className="game-over">
            <h1>Game Over!</h1>
            {atTheEndWinner && <p>winner: {atTheEndWinner} 🎉🎉</p>}
            {!atTheEndWinner && <p>It's Draw!</p>}
            <button onClick={reStart}>Rematch!</button>
        </div>
     );
}

export default GameOver;