import React from "react";

const Team = ({ team, numberTeam }) => {
  return (
    <div>
      <h3>Equipo {numberTeam}</h3>
      {team.map((player) => (
        <p key={player.id}>{player.name}</p>
      ))}
    </div>
  );
};

export default Team;
