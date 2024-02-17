import React from "react";
import { Player } from "../Classes/Player";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#59e961",
  },
});

const Team = ({ team }) => {
  return (
    <div className="team">
      {team !== undefined ? (
        <div className="team-container">
          <h3>TEAM {team.getTeamNumber()}</h3>
          <StyledRating
            name="text-feedback"
            value={team.averageSkill()}
            readOnly
            precision={0.01}
            emptyIcon={
              <StarIcon style={{ opacity: 0.40, color: "grey" }} fontSize="inherit" />
            }
          />
          <div>
            {team.getPlayers().map((player: Player) => (
              <p key={player.getId()}>{player.name}</p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Team;
