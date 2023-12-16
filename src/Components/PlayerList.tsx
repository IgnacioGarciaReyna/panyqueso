import React from "react";
import BasicTable from "./PlayersTable.tsx";

const PlayerList = ({ players, setPlayers }) => {
  const refreshPlayers = () => {
    setPlayers(players.copyPlayersList());
  };

  return (
    <div className="table-container">
      <BasicTable players={players} refreshPlayers={refreshPlayers} />
    </div>
  );
};

export default PlayerList;
