import React from "react";

const Team = ({ team, numberTeam }) => {
  return (
    <div className="team">
      {team !== undefined ? (
        <div>
          <h3>Equipo {numberTeam}</h3>
          <h4>Skills: {team.skills()}</h4>
          {team.playersOfTheTeam().map((player) => (
            <p key={player.id}>{player.name}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Team;
