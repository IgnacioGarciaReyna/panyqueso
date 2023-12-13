import React, { useState } from "react";
import Team from "./Team.tsx";
import { Player } from "../Classes/Player.tsx";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Match = ({ players }) => {
  const [firstTeam, setFirstTeam] = useState<Array<Player>>([]);
  const [secondTeam, setSecondTeam] = useState<Array<Player>>([]);

  const skillsOf = (team) => {
    if (team.length > 0) {
      return team.reduce((accumulator, player: Player) => {
        return accumulator + player.skills;
      }, 0);
    } else {
      return 0;
    }
  };

  const bestPlayerOf = (playersToProcess) => {
    let maxSkill = playersToProcess
      .map((player: Player) => player.skills)
      .reduce((a: number, b: number) => {
        return Math.max(a, b);
      });
    const bestPlayer = playersToProcess.find(
      (player: Player) => player.skills == maxSkill
    );
    return bestPlayer;
  };

  const gkFromArray = (playersArray: Array<Player>) => {
    return playersArray.find((player) => player.goalkeeper);
  };

  const createTeams = () => {
    let playersToProcess: Array<Player> = [...players];
    const firstTeamPlayers: Array<Player> = [];
    const secondTeamPlayers: Array<Player> = [];

    while (playersToProcess.length > 0) {
      const playerToAdd: Player = gkFromArray(playersToProcess)
        ? gkFromArray(playersToProcess)
        : bestPlayerOf(playersToProcess);
      if (skillsOf(firstTeamPlayers) > skillsOf(secondTeamPlayers)) {
        secondTeamPlayers.push(playerToAdd);
      } else {
        firstTeamPlayers.push(playerToAdd);
      }
      playersToProcess = playersToProcess.filter(
        (player) => player.id !== playerToAdd.id
      );
    }

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
