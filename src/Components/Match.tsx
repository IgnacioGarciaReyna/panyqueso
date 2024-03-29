import React, { useState } from "react";
import Team from "./Team.tsx";
import { Button, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TeamClass } from "../Classes/TeamClass.tsx";
import { MatchClass } from "../Classes/MatchClass.tsx";
import { green } from "@mui/material/colors";
import TeamsModal from "./TeamsModal.tsx";
import { DisplaySettings } from "@mui/icons-material";

const Match = ({ players }) => {
  const [firstTeam, setFirstTeam] = useState<TeamClass>();
  const [secondTeam, setSecondTeam] = useState<TeamClass>();
  const [open, setOpen] = useState(false);

  const createTeams = () => {
    setOpen(true);
    const match = new MatchClass(players);
    const teamsTuple = match.createTeams();
    setFirstTeam(teamsTuple[0]);
    setSecondTeam(teamsTuple[1]);
  };

  return (
    <Container
      className="match-container"
      style={{ padding: "0", margin: "0 0 60px 0" }}
    >
      <Button
        style={{
          display: players.hasSomePlayer() ? "" : "none",
          margin: "20px 0",
          fontWeight: "bold"
        }}
        className="create-button"
        variant="outlined"
        sx={{
          color: green["A700"],
          "& .MuiButtonBase-root-MuiButton-root": {
            border: "1px solid white",
          },
        }}
        endIcon={<SendIcon />}
        onClick={createTeams}
      >
        Armar teams
      </Button>

      <TeamsModal
        firstTeam={firstTeam}
        secondTeam={secondTeam}
        open={open}
        setOpen={setOpen}
        createTeams={createTeams}
      />
    </Container>
  );
};

export default Match;
