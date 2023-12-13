import React, { useState } from "react";
import Team from "./Team.tsx";
import { Player } from "../Classes/Player.tsx";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TeamClass } from "../Classes/TeamsClass.tsx";

const Match = ({ players }) => {
  const [firstTeam, setFirstTeam] = useState<TeamClass>();
  const [secondTeam, setSecondTeam] = useState<TeamClass>();

  const bestPlayerOf = (playersToProcess) => {
    let maxSkill = playersToProcess
      .map((player: Player) => player.skills)
      .reduce((a: number, b: number) => {
        return Math.max(a, b);
      });
    const bestPlayer = playersToProcess.find(
      (player: Player) => player.skills === maxSkill
    );
    return bestPlayer;
  };

  const gkFromArray = (playersArray: Array<Player>) => {
    return playersArray.find((player) => player.goalkeeper);
  };

  const shufflePlayers = (players: Array<Player>) => {
    players.sort(() => Math.random() - 0.5);
  };

  const createTeams = () => {
    const firstTeamPlayers = new TeamClass();
    const secondTeamPlayers = new TeamClass();

    let playersToProcess: Array<Player> = [...players];
    shufflePlayers(playersToProcess);

    while (playersToProcess.length > 0) {
      //Si es arquero, uso al arquero, si no al mejor de la lista
      //Arqueros: es necesario separarlos al principio? Está bien que solo pueda haber dos? Si estuviera mal debería agregarse como una habilidad como por ej goleador, rápido, arquero, etc es un jugador que tiene la posibilidad de atajar pero no es arquero fijo
      const playerToAdd: Player = gkFromArray(playersToProcess)
        ? gkFromArray(playersToProcess)
        : bestPlayerOf(playersToProcess);

      //Agregar al team con menos skills
      if (firstTeamPlayers.skills() > secondTeamPlayers.skills()) {
        secondTeamPlayers.addPlayer(playerToAdd);
      } else {
        firstTeamPlayers.addPlayer(playerToAdd);
      }

      //Quitar player
      playersToProcess = playersToProcess.filter(
        (player) => player.id !== playerToAdd.id
      );
    }

    //Crear una función para nivelar los equipos.
    //Si hay mucha diferencia, se debería pasar un jugador de equipo, probablemente una normal por uno malo

    setFirstTeam(firstTeamPlayers);
    setSecondTeam(secondTeamPlayers);
  };

  return (
    <div className="match-container">
      <Button variant="outlined" endIcon={<SendIcon />} onClick={createTeams}>
        Armar equipos
      </Button>
      <div className="teams-container">
        <Team team={firstTeam} numberTeam={1} />
        <Team team={secondTeam} numberTeam={2} />
      </div>
    </div>
  );
};

export default Match;
