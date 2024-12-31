import { Box, Typography } from "@mui/material";
import Stat from "../Stat/Stat";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { useContext } from "react";

function Tile({ name, image, weight, height, baseExperience, ability, fought, won_fights, lose_fights }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "220px",
        height: "350px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "25px",
        border: "1px solid #cccccc",
        borderRadius: "25px",
        boxShadow: 4,
        cursor: "pointer",
        opacity: "90%",
        background: `${
          isDarkMode
            ? "linear-gradient(-45deg, #292727, #494949,#292727)"
            : "linear-gradient(-45deg, #c5c5c4, #ffffff,#a7a5a2)"
        }`,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      {fought && (
        <Box
          sx={{
            width: "100px",
            position: "relative",
            top: "-15px",
            textAlign: "center",
            border: "solid 1px #cccccc",
            borderTop: "none",
            borderRadius: "0px 0px 10px 10px",
            backgroundColor: "#8b8b8ba6",
          }}
        >
          W:{won_fights} L:{lose_fights}
        </Box>
      )}
      <Box
        component="img"
        sx={{
          scale: "1.2",
          filter: "drop-shadow(-2px -1px 1.5px rgba(0, 0, 0, 0.5))",
          zIndex: "-1",
        }}
        src={image}
        alt={`Image Pokemon ${name}`}
      />
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", width: "100%", rowGap: "25px" }}>
        <Stat name="Base Experience" value={baseExperience} />
        <Stat name="Height" value={height} />
        <Stat name="Weight" value={weight} />
        <Stat name="Ability" value={ability} />
      </Box>
    </Box>
  );
}
export default Tile;
