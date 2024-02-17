import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlayerEditor from "./PlayerEditor.tsx";
import { Player } from "../Classes/Player";

export default function PlayersTable({ players, refreshPlayers }) {
  const removePlayerFromList = (id: number) => {
    players.removePlayer(id);
    refreshPlayers();
  };

  return (
    <TableContainer component={Paper}>
      <Table 
      // sx={{ minWidth: 650 }} 
      aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Habilidad</TableCell>
            {/* <TableCell align="center">Posición</TableCell> */}
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.getPlayers().map((player: Player) => (
            <PlayerEditor
              player={player}
              removePlayerFromList={removePlayerFromList}
              refreshPlayers={refreshPlayers}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
