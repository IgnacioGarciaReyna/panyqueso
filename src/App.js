import { useState } from "react";
import React from "react";
import PlayerEditor from "./Components/PlayerEditor";
import Team from "./Components/Team";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import BasicTable from "./Components/PlayersTable";

function App() {
  const [players, setPlayers] = useState([]);
  const [firstTeam, setFirstTeam] = useState([]);
  const [secondTeam, setSecondTeam] = useState([]);

  const refreshPlayers = () => {
    setPlayers([...players]);
  };

  const nameInput = React.useRef();

  const createPlayer = (playerName) => {
    return {
      id: players.length + 1,
      name: playerName,
      skills: 0,
      goalkeeper: false,
    };
  };

  const addPlayer = (e) => {
    e.preventDefault();
    const nameNewPlayer = e.target.name.value;
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

  const playerAlreadyExists = (name) => {
    return players.find(
      (player) => player.name.toUpperCase() === name.toUpperCase()
    );
  };

  const gkLimitReached = () => {
    return players.filter((player) => player.goalkeeper).length >= 2;
  };

  const deletePlayer = (id) => {
    const newPlayers = players.filter((player) => player.id !== id);
    setPlayers(newPlayers);
  };

  const skillsOf = (team) => {
    if (team.length > 0) {
      return team.reduce((accumulator, player) => {
        return accumulator + player.skills;
      }, 0);
    } else {
      return 0;
    }
  };

  const bestPlayerOf = (playersToProcess) => {
    let maxSkill = playersToProcess
      .map((player) => player.skills)
      .reduce((a, b) => {
        return Math.max(a, b);
      });
    const bestPlayer = playersToProcess.find(
      (player) => player.skills == maxSkill
    );
    return bestPlayer;
  };

  const gkFromArray = (playersArray) => {
    return playersArray.find((player) => player.goalkeeper);
  };

  const createTeams = () => {
    let playersToProcess = [...players];
    const firstTeamPlayers = [];
    const secondTeamPlayers = [];

    while (playersToProcess.length > 0) {
      const playerToAdd = gkFromArray(playersToProcess)
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
      <form onSubmit={addPlayer}>
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
