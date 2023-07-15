import React from "react";

const PlayerEditor = ({ player, deletePlayer, refreshPlayers }) => {
  const setSkill = (e) => {
    e.preventDefault();
    player.skills = parseInt(e.target.value);
    refreshPlayers();
  };

  const handleDeletePlayer = () => {
    deletePlayer(player.id);
  };

  const changePosition = () => {
    player.goalkeeper = !player.goalkeeper;
    refreshPlayers();
  };

  return (
    <li className="player-editor" key={player.id}>
      <p>{player.name}</p>
      <p>Skills:</p>
      <input type="number" name="skill" min="0" max="5" onChange={setSkill} />
      <p onClick={changePosition}>
        {player.goalkeeper ? "Arquero" : "Jugador"}
      </p>
      <button type="button" onClick={handleDeletePlayer}>
        X
      </button>
    </li>
  );
};

export default PlayerEditor;
