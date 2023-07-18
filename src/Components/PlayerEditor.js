import React from "react";
import SkillsRating from "./SkillsRating";

const positionImages = require.context("../assets/img/", true);

const PlayerEditor = ({
  player,
  deletePlayer,
  refreshPlayers,
  gkLimitReached,
}) => {
  const setSkill = (e) => {
    e.preventDefault();
    player.skills = parseInt(e.target.value);
    refreshPlayers();
  };

  const handleDeletePlayer = () => {
    deletePlayer(player.id);
  };

  const changePosition = () => {
    if (!player.goalkeeper && gkLimitReached()) {
      alert("Solo puede haber dos goalkeepers");
    } else {
      player.goalkeeper = !player.goalkeeper;
      refreshPlayers();
    }
  };

  return (
    <li className="player-editor" key={player.id}>
      <p>{player.name}</p>
      <SkillsRating setSkill={setSkill} />
      <img
        className="position-icon"
        src={
          player.goalkeeper
            ? positionImages("./goalkeeper.png")
            : positionImages("./player.png")
        }
        alt=""
        onClick={changePosition}
      />
      <button type="button" onClick={handleDeletePlayer}>
        X
      </button>
    </li>
  );
};

export default PlayerEditor;
