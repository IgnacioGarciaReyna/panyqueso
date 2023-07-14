import React from "react";

const PlayerEditor = ({ player, deletePlayer }) => {
  const setSkill = (e) => {
    e.preventDefault();

    player.skill = e.target.value;
    console.log(player);
  };

  const handleDeletePlayer = (id) => {
    deletePlayer(id);
  };

  return (
    <li key={player.id}>
      <p>{player.name}</p>
      <input type="number" name="skill" min="0" max="5" onChange={setSkill} />
      <p>Skill: {player.skill}</p>
      {player.goalkipper ? <p>Arquero</p> : <p>Jugador</p>}
      <button type="button" onClick={() => handleDeletePlayer(player.id)}>
        Delete
      </button>
    </li>
  );
};

export default PlayerEditor;
