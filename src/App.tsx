import { useState } from "react";
import React from "react";
import PlayerEditor from "./Components/PlayerEditor";
import Team from "./Components/Team";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import BasicTable from "./Components/PlayersTable";

function App() {
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [firstTeam, setFirstTeam] = useState<Array<Player>>([]);
  const [secondTeam, setSecondTeam] = useState<Array<Player>>([]);

  const refreshPlayers = () => {
    setPlayers([...players]);
  };

  const nameInput: any = React.useRef();

  class Player {
    id: Number;
    name: String;
    skills: Number;
    goalkeeper: Boolean;
  }

  const createPlayer = (playerName: String) => {
    const newPlayer = new Player();

    newPlayer.id = players.length + 1;
    newPlayer.name = playerName;
    newPlayer.skills = 0;
    newPlayer.goalkeeper = false;

    return newPlayer;
  };

  const addPlayer = (e) => {
    e.preventDefault();
    const nameNewPlayer: String = e.target.name.value;
    if (nameNewPlayer === "") return;
    if (playerAlreadyExists(nameNewPlayer)) {
      alert("Ya existe un player con ese nombre");
    } else {
      const newPlayer = createPlayer(nameNewPlayer);
      resetNameInput();
      setPlayers([...players, newPlayer]);
    }
  };

  const resetNameInput = () => {
    nameInput.current.children[1].children.name.value = "";
  };

  const playerAlreadyExists = (name: String) => {
    return players.find(
      (player: Player) => player.name.toUpperCase() === name.toUpperCase()
    );
  };

  const gkLimitReached = () => {
    return players.filter((player: Player) => player.goalkeeper).length >= 2;
  };

  const deletePlayer = (id: Number) => {
    const newPlayers = players.filter((player: Player) => player.id !== id);
    setPlayers(newPlayers);
  };

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
      .reduce((a, b) => {
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
    <div className="container">
      <h1>Fulbito</h1>
      <form className="form-submit-player" onSubmit={addPlayer}>
        <TextField
          name="name"
          id="filled-basic"
          label="Nombre player"
          variant="filled"
          ref={nameInput}
        />

        <Button variant="outlined" size="small" type="submit" name="submit">
          Cargar Jugador
        </Button>
      </form>
      <div className="table-container">
        <BasicTable
          players={players}
          deletePlayer={deletePlayer}
          refreshPlayers={refreshPlayers}
          gkLimitReached={gkLimitReached}
        />
      </div>

      <div>
        <Button variant="outlined" endIcon={<SendIcon />} onClick={createTeams}>
          Armar equipos
        </Button>
      </div>
      <Team team={firstTeam} numberTeam={1} />
      <Team team={secondTeam} numberTeam={2} />
    </div>
  );
}

export default App;
