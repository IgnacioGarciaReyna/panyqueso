import { useState } from "react";
import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Match from "./Components/Match.tsx";
import { Player } from "./Classes/Player.tsx";
import PlayerList from "./Components/PlayerList.tsx";

function App() {
  const [players, setPlayers] = useState<Array<Player>>([]);

  const nameInput: any = React.useRef();

  const resetNameInput = () => {
    nameInput.current.children[1].children.name.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameNewPlayer: String = e.target.name.value;
    if (nameNewPlayer === "") return;

    addPlayer(nameNewPlayer);

    resetNameInput();
  };

  const createPlayer = (playerName: String) => {
    const newPlayer = new Player();

    newPlayer.id = players.length + 1;
    newPlayer.name = playerName;

    return newPlayer;
  };

  const addPlayer = (nameNewPlayer: String) => {
    if (playerAlreadyExists(nameNewPlayer)) {
      alert("Ya existe un player con ese nombre");
    } else {
      const newPlayer = createPlayer(capitalizeFirst(nameNewPlayer));

      setPlayers([...players, newPlayer]);
    }
  };

  const capitalizeFirst = (name: String) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const playerAlreadyExists = (name: String) => {
    return players.find(
      (player: Player) => player.name.toUpperCase() === name.toUpperCase()
    );
  };

  return (
    <div className="container">
      <h1>Fulbito</h1>
      <form className="form-submit-player" onSubmit={handleSubmit}>
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

      <PlayerList players={players} setPlayers={setPlayers} />

      <Match players={players} />
    </div>
  );
}

export default App;
