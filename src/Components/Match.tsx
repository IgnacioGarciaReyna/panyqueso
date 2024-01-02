import React, { useState } from "react";
import Team from "./Team.tsx";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TeamClass } from "../Classes/TeamClass.tsx";
import { MatchClass } from "../Classes/MatchClass.tsx";
import { green } from "@mui/material/colors";

const Match = ({ players }) => {
  const [firstTeam, setFirstTeam] = useState<TeamClass>();
  const [secondTeam, setSecondTeam] = useState<TeamClass>();

  const createTeams = () => {
    const match = new MatchClass(players);
    const teamsTuple = match.createTeams();
    setFirstTeam(teamsTuple[0]);
    setSecondTeam(teamsTuple[1]);
  };

  return (
    <div className="match-container">
      <Button
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
        Armar equipos
      </Button>
      <div className="teams-container">
        <Team team={firstTeam} />
        <Team team={secondTeam} />
      </div>
    </div>
  );
};

export default Match;
