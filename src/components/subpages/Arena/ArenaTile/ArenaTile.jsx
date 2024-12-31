import { Box, IconButton } from "@mui/material";
import Tile from "../../../shared/Tile/Tile";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { DarkModeContext } from "../../../../context/DarkModeContext";

function ArenaTile() {
  const { isDarkMode } = useContext(DarkModeContext);
  const isAdded = false;
  return (
    <>
      {isAdded ? (
        <Box>
          <IconButton
            sx={{ float: "right", position: "relative", left: "-45px", zIndex: "1" }}
            color="primary"
            aria-label="close"
            onClick={() => console.log("Przycisk zamknięcia kliknięty!")}
          >
            <CloseIcon />
          </IconButton>
          <Tile />
        </Box>
      ) : (
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
            cursor: "pointer",
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
          <img src="/Pokedex.png" width="150" alt="" />
          <AddIcon sx={{ fontSize: "100px" }} />
        </Box>
      )}
    </>
  );
}
export default ArenaTile;
