import React, { useState } from "react";
import Team from "./Team.tsx";
import { Box, Button, Modal } from "@mui/material";

const style = {};

const TeamsModal = ({ firstTeam, secondTeam, open, setOpen }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="teams-container">
            <Team team={firstTeam} />
            <Team team={secondTeam} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TeamsModal;
