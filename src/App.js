import { useState } from "react";
import React from "react";
import PlayerEditor from "./Components/PlayerEditor";

function App() {
  const [players, setPlayers] = useState([]);
  const [firstTeam, setFirstTeam] = useState([]);
  const [secondTeam, setSecondTeam] = useState([]);

  const refreshPlayers = () => {
    setPlayers([...players]);
  };

  const addPlayer = (e) => {
    e.preventDefault();
    const newPlayer = {
      id: e.target.name.value,
      name: e.target.name.value,
      skills: 0,
      goalkeeper: false,
    };
    setPlayers([...players, newPlayer]);
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
      console.log("firstTeamPlayers skills -> " + skillsOf(firstTeamPlayers));
      console.log("secondTeamPlayers skills -> " + skillsOf(secondTeamPlayers));
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
    <div>
      <h1>Fulbito</h1>
      <form onSubmit={addPlayer}>
        <input type="text" name="name" />
        <button type="submit" name="submit">
          Cargar Jugador
        </button>
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
      <div>
        <h3>Equipo 1</h3>
        {firstTeam.map((player) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </div>
      <div>
        <h3>Equipo 2</h3>
        {secondTeam.map((player) => (
          <p key={player.id}>{player.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
