import React from "react";

const Team = ({ team, numberTeam }) => {
  return (
    <div className="team">
      {team.length > 0 ? (
        <div>
          <h3>Equipo {numberTeam}</h3>
          {team.map((player) => (
            <p key={player.id}>{player.name}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Team;
