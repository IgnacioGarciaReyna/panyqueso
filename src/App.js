import { useState } from "react";
import React from "react";

function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    const newPlayer = {
      id: e.target.name.value,
      name: e.target.name.value,
      skill: 0,
      goalkeeper: false,
    };
    setPlayers([...players, newPlayer]);
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
            <li key={player.id}>{player.name}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
