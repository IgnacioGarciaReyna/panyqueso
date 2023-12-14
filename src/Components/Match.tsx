import React, { useState } from "react";
import Team from "./Team.tsx";
import { Player } from "../Classes/Player.tsx";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TeamClass } from "../Classes/TeamClass.tsx";
import { PlayersListClass } from "../Classes/PlayersListClass.tsx";

const Match = ({ players }) => {
  const [firstTeam, setFirstTeam] = useState<TeamClass>();
  const [secondTeam, setSecondTeam] = useState<TeamClass>();

  const createTeams = () => {
    const firstTeam = new TeamClass();
    const secondTeam = new TeamClass();

    firstTeam.setTeamNumber(1);
    secondTeam.setTeamNumber(2);

    const playersList: PlayersListClass = new PlayersListClass();
    players.forEach((player: Player) => playersList.addPlayer(player));
    playersList.shufflePlayers();

    while (playersList.getPlayers().length > 0) {
      //Si es arquero, uso al arquero, si no al mejor de la lista
      //Arqueros: es necesario separarlos al principio? Está bien que solo pueda haber dos? Si estuviera mal debería agregarse como una habilidad como por ej goleador, rápido, arquero, etc es un jugador que tiene la posibilidad de atajar pero no es arquero fijo

      const playerToAdd: Player = playersList.firstPlayerToAdd();

      //Agregar al team con menos skills
      if (firstTeam.skills() > secondTeam.skills()) {
        secondTeam.addPlayer(playerToAdd);
      } else {
        firstTeam.addPlayer(playerToAdd);
      }

      //Quitar player
      playersList.deletePlayer(playerToAdd);
    }

    //Crear una función para nivelar los equipos.
    //Si hay mucha diferencia, se debería pasar un jugador de equipo, probablemente una normal por uno malo

    setFirstTeam(firstTeam);
    setSecondTeam(secondTeam);
  };

  return (
    <div className="match-container">
      <Button variant="outlined" endIcon={<SendIcon />} onClick={createTeams}>
        Armar equipos
      </Button>
      <div className="teams-container">
        <Team team={firstTeam} />
        <Team team={secondTeam} />
      </div>
    </div>
  );
};

export default Match;
