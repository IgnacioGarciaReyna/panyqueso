import { useState } from "react";
import React from "react";
import PlayerEditor from "./Components/PlayerEditor";
import Team from "./Components/Team";

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
      id: playerName,
      name: playerName,
      skills: 0,
      goalkeeper: false,
    };
  };

  const addPlayer = (e) => {
    e.preventDefault();
    const newPlayer = createPlayer(e.target.name.value);
    nameInput.current.value = "";
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
