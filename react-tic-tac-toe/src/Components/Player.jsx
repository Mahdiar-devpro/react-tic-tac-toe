import { useState } from "react";

function Player({ initialPlayerName, initialPlayerSymbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialPlayerName);

  function handleEdit() {
    setIsEditing((editing) => !editing);
    console.log(isEditing);
  }

  function handleChangePlayerName(event) {
    setPlayerName(event.target.value);
  }

  let playerArea = <p>{playerName}</p>;
  if (isEditing) {
    playerArea = (
      <input
        type="text"
        value={playerName}
        required
        onChange={handleChangePlayerName}
      />
    );
  }

  return (
    <section className="player">
      <div className={`player-info ${isActive ? "active" : undefined}`}>
        {playerArea}
        <h2>{initialPlayerSymbol}</h2>
      </div>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </section>
  );
}

export default Player;
