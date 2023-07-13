import { useEffect, useState } from "react";
import React from "react";

function App() {
  const [firstTeam, setFirstTeam] = useState(["na"]);
  const [secondTeam, setSecondTeam] = useState([]);

  const addPlayer = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    const newPlayer = e.target.name.value;
    setFirstTeam([...firstTeam, newPlayer]);
  };

  return (
    <div>
      <h1>Fulbito</h1>
      <form onSubmit={addPlayer}>
        <input type="text" name="name" />
        <select>
          <option value="0" key="0">
            -- Seleccionar Equipo --
          </option>
          <option value="1" key="1">
            Equipo 1
          </option>
          <option value="2" key="2">
            Equipo 2
          </option>
        </select>
        <button type="submit" name="submit">
          Cargar Jugador
        </button>
      </form>
      <div>
        <ol>
          {firstTeam.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ol>
      </div>
      {/* <div>
        <ol>
          {secondTeam.map((player) => (
            <li>{player}</li>
          ))}
        </ol>
      </div> */}
    </div>
  );
}

export default App;
