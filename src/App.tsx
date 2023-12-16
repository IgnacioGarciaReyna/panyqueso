import { useState } from "react";
import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Match from "./Components/Match.tsx";
import { Player } from "./Classes/Player.tsx";
import PlayerList from "./Components/PlayerList.tsx";
import { PlayersListClass } from "./Classes/PlayersListClass.tsx";

function App() {
  const [players, setPlayers] = useState<PlayersListClass>(
    new PlayersListClass()
  );

  const nameInput: any = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameNewPlayer: String = e.target.name.value;
    
    if (nameNewPlayer === "") {
      alert("Por favor, ingresá un nombre");
    } else if (players.hasPlayer(nameNewPlayer)) {
      alert("Ya existe un player con ese nombre");
    } else {
      players.addPlayer(createPlayer(nameNewPlayer));

      setPlayers(players.copyPlayersList());
    }
    resetNameInput();
  };

  const createPlayer = (playerName: String) => {
    return new Player(players.newIDForPlayer(), capitalizeFirst(playerName));
  };

  const capitalizeFirst = (name: String) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const resetNameInput = () => {
    nameInput.current.children[1].children.name.value = "";
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
