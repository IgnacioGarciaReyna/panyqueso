import React, { useState } from "react";
import BasicTable from "./PlayersTable";
import { Player } from "../Classes/Player";

const PlayerList = ({ players, setPlayers }) => {
  const deletePlayer = (id: Number) => {
    const newPlayers = players.filter((player: Player) => player.id !== id);
    setPlayers(newPlayers);
  };

  const refreshPlayers = () => {
    setPlayers([...players]);
  };

  const gkLimitReached = () => {
    return players.filter((player: Player) => player.goalkeeper).length >= 2;
  };

  return (
    <div className="table-container">
      <BasicTable
        players={players}
        deletePlayer={deletePlayer}
        refreshPlayers={refreshPlayers}
        gkLimitReached={gkLimitReached}
      />
    </div>
  );
};

export default PlayerList;
