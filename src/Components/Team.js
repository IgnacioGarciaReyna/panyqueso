import React from "react";

const Team = ({ team }) => {
  return (
    <div>
      <h3>Equipo 1</h3>
      {team.map((player) => (
        <p key={player.id}>{player.name}</p>
      ))}
    </div>
  );
};

export default Team;
