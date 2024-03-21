import React from "react";
import { useCallback, useState } from "react";
import { TransferList, TransferListList } from "react-transfer-list";
import { Player } from "../Classes/Player";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#59e961",
  },
});

const TransferListComp = ({ firstTeam, secondTeam, handleTransfer }) => {
  const initialIds: Record<string, string[]> = {
    first: Array.from({ length: 10 }).map((_, i) => String(i + 1)),
  };

  // const initialNames: Record<string, string[]> = {
  //   first: ,
  // };

  const [ids, setIds] = useState({
    first: firstTeam.getPlayersNames(),
    second: secondTeam.getPlayersNames(),
  });

  const handleChange = useCallback((listId: string, ids: string[]) => {
    handleTransfer(listId, ids);
    setIds((orig) => {
      orig[listId] = [...ids];
      return { ...orig };
    });
  }, []);

  return (
    <TransferList ids={ids} onChange={handleChange}>
      <div className="team">
        {firstTeam !== undefined ? (
          <div className="team-container">
            <h3>TEAM {firstTeam.getTeamNumber()}</h3>
            <StyledRating
              name="text-feedback"
              value={firstTeam.averageSkill()}
              readOnly
              precision={0.01}
              emptyIcon={
                <StarIcon
                  style={{ opacity: 0.4, color: "grey" }}
                  fontSize="inherit"
                />
              }
            />
            <TransferListList
              id="first"
              style={{
                height: "100%",
                background: "black",
                margin: "10px",
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="team">
        {secondTeam !== undefined ? (
          <div className="team-container">
            <h3>TEAM {secondTeam.getTeamNumber()}</h3>
            <StyledRating
              name="text-feedback"
              value={secondTeam.averageSkill()}
              readOnly
              precision={0.01}
              emptyIcon={
                <StarIcon
                  style={{ opacity: 0.4, color: "grey" }}
                  fontSize="inherit"
                />
              }
            />
            <TransferListList
              id="second"
              style={{
                height: "100%",
                background: "black",
                margin: "10px",
              }}
            />
          </div>
        ) : null}
      </div>
    </TransferList>
  );
};

export default TransferListComp;
