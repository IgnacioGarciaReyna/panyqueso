import { useState } from "react";
import React from "react";
import PlayerEditor from "./Components/PlayerEditor";
import Team from "./Components/Team";

function App() {
  const [players, setPlayers] = useState([]);
  const [firstTeam, setFirstTeam] = useState([]);
  const [secondTeam, setSecondTeam] = useState([]);
  const [nameError, setNameError] = useState(false);

  const refreshPlayers = () => {
    setPlayers([...players]);
  };

  const nameInput = React.useRef();

  const createPlayer = (playerName) => {
    return {
      id: playerName,
      name: playerName,
      skills: 0,
      goalkeeper: false,
    };
  };

  const addPlayer = (e) => {
    e.preventDefault();
    const nameNewPlayer = e.target.name.value;
    if (playerAlreadyExists(nameNewPlayer)) {
      setNameError(true);
    } else {
      setNameError(false);
      const newPlayer = createPlayer(nameNewPlayer);
      resetNameInput();
      setPlayers([...players, newPlayer]);
    }
  };

  const resetNameInput = () => {
    nameInput.current.value = "";
  };

  const playerAlreadyExists = (name) => {
    return players.find(
      (player) => player.name.toUpperCase() === name.toUpperCase()
    );
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

  const createTeams = () => {
    let playersToProcess = [...players];
    const firstTeamPlayers = [];
    const secondTeamPlayers = [];

    while (playersToProcess.length > 0) {
      const bestPlayer = bestPlayerOf(playersToProcess);
      if (skillsOf(firstTeamPlayers) > skillsOf(secondTeamPlayers)) {
        secondTeamPlayers.push(bestPlayer);
      } else {
        firstTeamPlayers.push(bestPlayer);
      }
      playersToProcess = playersToProcess.filter(
        (player) => player.id !== bestPlayer.id
      );
    }

    setFirstTeam(firstTeamPlayers);
    setSecondTeam(secondTeamPlayers);
  };

  return (
    <div className="container">
      <h1>Fulbito</h1>
      <form onSubmit={addPlayer}>
        <input type="text" name="name" ref={nameInput} />
        <button type="submit" name="submit">
          Cargar Jugador
        </button>
        {nameError ? <p>Ya existe un player con el mismo nombre</p> : null}
      </form>
      <div>
        <ol>
          {players.map((player) => (
            <PlayerEditor
              player={player}
              key={player.id}
              deletePlayer={deletePlayer}
              refreshPlayers={refreshPlayers}
            />
          ))}
        </ol>
        <button type="button" onClick={createTeams}>
          Armar equipos
        </button>
      </div>
      <Team team={firstTeam} numberTeam={1} />
      <Team team={secondTeam} numberTeam={2} />
    </div>
  );
}

export default App;
