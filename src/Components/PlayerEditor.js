import React from "react";
import SkillsRating from "./SkillsRating";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const positionImages = require.context("../assets/img/", true);

const PlayerEditor = ({
  player,
  deletePlayer,
  refreshPlayers,
  gkLimitReached,
}) => {
  const setSkill = (e) => {
    e.preventDefault();
    player.skills = parseInt(e.target.value);
    refreshPlayers();
  };

  const handleDeletePlayer = () => {
    deletePlayer(player.id);
  };

  const changePosition = () => {
    if (!player.goalkeeper && gkLimitReached()) {
      alert("Solo puede haber dos goalkeepers");
    } else {
      player.goalkeeper = !player.goalkeeper;
      refreshPlayers();
    }
  };

  return (
    <TableRow
      key={player.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center" padding="none">
        {player.id}
      </TableCell>

      <TableCell align="center" padding="none">
        {" "}
        {player.name}
      </TableCell>
      <TableCell align="center" padding="none">
        <SkillsRating setSkill={setSkill} className="setSkill" />
      </TableCell>
      <TableCell align="center" padding="none">
        <img
          className="position-icon"
          src={
            player.goalkeeper
              ? positionImages("./goalkeeper.png")
              : positionImages("./player.png")
          }
          alt=""
          onClick={changePosition}
        />
      </TableCell>
      <TableCell align="center" padding="none">
        <Button
          sx={{ padding: 0, minWidth: 0 }}
          variant="outlined"
          color="error"
          onClick={handleDeletePlayer}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PlayerEditor;
