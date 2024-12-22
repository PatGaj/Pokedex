// obrazek https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png

import { Box, Typography } from "@mui/material";
import Stat from "../Stat/Stat";

import { PokemonImage } from "./Tile.styles";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { useContext } from "react";


function Tile() {
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
      <PokemonImage src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png" alt="" />
      <Typography variant="h4" gutterBottom>
        Name
      </Typography>
      <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",width:"100%",rowGap:"25px"}}>
        <Stat name="HP" value="999" />
        <Stat name="HP" value="999" />
        <Stat name="HP" value="999" />
        <Stat name="HP" value="999" />
      </Box>
    </Box>
  );
}
export default Tile;
