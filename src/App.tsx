import { useState } from "react";
import React from "react";
import Icon from "@mui/material/Icon";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Match from "./Components/Match.tsx";
import { Player } from "./Classes/Player.tsx";
import PlayerList from "./Components/PlayerList.tsx";
import { PlayersListClass } from "./Classes/PlayersListClass.tsx";
import { green } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
    <Container>
      <h1 className="app-title">ARMATE LOS TEAMS</h1>
      <form className="form-submit-player" onSubmit={handleSubmit}>
        <TextField
          name="name"
          id="filled-basic"
          label="Nombre player"
          variant="filled"
          color="success"
          ref={nameInput}
        />
        <button className="add-button" type="submit" name="submit">
          <Icon sx={{ color: green["A700"] }}>
            <AddCircleIcon />
          </Icon>
        </button>
      </form>

      <PlayerList players={players} setPlayers={setPlayers} />

      <Match players={players} />
    </Container>
  );
}

export default App;
