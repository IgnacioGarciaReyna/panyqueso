import React from "react";
import PlayersTable from "./PlayersTable.tsx";

const PlayerList = ({ players, setPlayers }) => {
  const refreshPlayers = () => {
    setPlayers(players.copyPlayersList());
  };

  return <PlayersTable players={players} refreshPlayers={refreshPlayers} />;
};

export default PlayerList;
