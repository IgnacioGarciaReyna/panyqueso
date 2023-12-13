import { useState } from "react";
import React from "react";
import PlayerEditor from "./Components/PlayerEditor";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import BasicTable from "./Components/PlayersTable";
import Match from "./Components/Match.tsx";
import { Player } from "./Classes/Player.tsx";

function App() {
  const [players, setPlayers] = useState<Array<Player>>([]);

  const refreshPlayers = () => {
    setPlayers([...players]);
  };

  const nameInput: any = React.useRef();

  const createPlayer = (playerName: String) => {
    const newPlayer = new Player();

    newPlayer.id = players.length + 1;
    newPlayer.name = playerName;

    return newPlayer;
  };

  const addPlayer = (e) => {
    e.preventDefault();
    const nameNewPlayer: String = e.target.name.value;
    if (nameNewPlayer === "") return;
    if (playerAlreadyExists(nameNewPlayer)) {
      alert("Ya existe un player con ese nombre");
    } else {
      const newPlayer = createPlayer(capitalizeFirstLetter(nameNewPlayer));
      resetNameInput();
      setPlayers([...players, newPlayer]);
    }
  };

  const capitalizeFirstLetter = (name: String) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
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
      <Match players={players} />
    </div>
  );
}

export default App;
