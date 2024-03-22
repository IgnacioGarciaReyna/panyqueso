import React from "react";
import { Box, Button, Modal } from "@mui/material";
import { green } from "@mui/material/colors";
import ReplayIcon from "@mui/icons-material/Replay";
import TransferListComp from "./TransferListComp.tsx";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  bgcolor: "black",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "35px 40px 0 40px",
};

const TeamsModal = ({
  firstTeam,
  secondTeam,
  open,
  setOpen,
  createTeams,
  handleTransfer,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <div className="teams-container">
            <Team team={firstTeam} />
            <Team team={secondTeam} />
          </div> */}
          {/* <Example firstTeam={firstTeam} secondTeam={secondTeam}/> */}
          <TransferListComp
            firstTeam={firstTeam}
            secondTeam={secondTeam}
            handleTransfer={handleTransfer}
          />
          <div className="button-resort-container">
            <Button
              className="create-button"
              variant="outlined"
              style={{ fontWeight: "bold" }}
              sx={{
                color: green["A700"],
                "& .MuiButtonBase-root-MuiButton-root": {
                  border: "1px solid white",
                },
              }}
              endIcon={<ReplayIcon />}
              onClick={createTeams}
            >
              Volver a sortear
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TeamsModal;
