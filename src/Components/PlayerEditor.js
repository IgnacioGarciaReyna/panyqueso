import React from "react";

const PlayerEditor = ({ player, deletePlayer }) => {
  const setSkill = (e) => {
    e.preventDefault();
    player.skill = e.target.value;
  };

  const handleDeletePlayer = () => {
    deletePlayer(player.id);
  };

  const changePosition = () => {
    player.goalkeeper = !player.goalkeeper;
  };

  return (
    <li className="player-editor" key={player.id}>
      <p>{player.name}</p>
      <p>Skill:</p>
      <input type="number" name="skill" min="0" max="5" onChange={setSkill} />
      <p onClick={changePosition}>
        {player.goalkeeper ? "Arquero" : "Jugador"}
      </p>
      <button type="button" onClick={handleDeletePlayer}>
        Delete
      </button>
    </li>
  );
};

export default PlayerEditor;
