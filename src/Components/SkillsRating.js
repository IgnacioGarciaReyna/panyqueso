import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";

const labels = {
  1: "Bajo nivel",
  2: "Normal",
  3: "Bueno",
  4: "Muy bueno",
  5: "Crack",
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#59e961",
  },
  "& .MuiRating-iconHover": {
    color: "#59e961",
  },
});

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function SkillsRating({ setSkill }) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledRating
        name="hover-feedback"
        value={value}
        
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          setSkill(event);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && <Box>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  );
}
