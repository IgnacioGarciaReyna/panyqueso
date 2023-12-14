import React from "react";
import { Player } from "../Classes/Player";

const Team = ({ team }) => {
  return (
    <div className="team">
      {team !== undefined ? (
        <div>
          <h3>Equipo {team.getTeamNumber()}</h3>
          <h4>Skills: {team.skills()}</h4>
          {team.getPlayers().map((player: Player) => (
            <p key={player.id}>{player.name}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Team;
