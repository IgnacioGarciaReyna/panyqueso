import { useEffect, useState } from "react";

function App() {
  const [firstTeam, setFirstTeam] = useState(["na"]);
  const [secondTeam, setSecondTeam] = useState([]);

  const addPlayer = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    const newPlayer = e.target.name.value;
    firstTeam.push(newPlayer);
    setFirstTeam(firstTeam);
  };

  useEffect(() => {
    console.log("UseEffect");
  }, [firstTeam]);

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
          {firstTeam != []
            ? firstTeam.map((player) => <li key={player}>{player}</li>)
            : null}
        </ol>
      </div>
      <div>
        <ol>
          {firstTeam != []
            ? secondTeam.map((player) => <li>{player}</li>)
            : null}
        </ol>
      </div>
    </div>
  );
}

export default App;
