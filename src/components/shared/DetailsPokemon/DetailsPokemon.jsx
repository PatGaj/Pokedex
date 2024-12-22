import { Box, Checkbox, Typography } from "@mui/material";
import Stat from "../Stat/Stat";
import { Favorite, FavoriteBorder, Stadium } from "@mui/icons-material";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import { useContext, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { ArenaContext } from "../../../context/ArenaContext";

function DetailsPokemon() {
  const { isLogin } = useContext(LoginContext);
  const { arenaFull, setInArena } = useContext(ArenaContext);
  const [isChecked, setIsChecked] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {isLogin && (
        <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", height: "50px" }}>
          <Checkbox
            disabled={arenaFull && !isChecked}
            icon={<StadiumOutlinedIcon />}
            checkedIcon={<Stadium />}
            onChange={() => {
              setInArena((prev) => prev + (event.target.checked ? 1 : -1));
              setIsChecked((prev) => !prev);
            }}
            sx={{
              alignSelf: "end",
              "& .MuiSvgIcon-root": {
                fontSize: 40,
                color: "gray",
              },
              "&.Mui-checked .MuiSvgIcon-root": {
                color: "green",
              },
            }}
          />
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            sx={{
              alignSelf: "end",
              "& .MuiSvgIcon-root": {
                fontSize: 40,
                color: "gray",
              },
              "&.Mui-checked .MuiSvgIcon-root": {
                color: "red",
              },
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          padding:"25px",
          height: "calc(100% - 50px)",
          display: "flex",
          border: "1px solid #cccccc",
          borderRadius: "25px",
          opacity: "95%",
          background: `${
            isDarkMode
              ? "linear-gradient(-45deg, #292727, #494949,#292727)"
              : "linear-gradient(-45deg, #c5c5c4, #ffffff,#a7a5a2)"
          }`,
        }}
      >
        <Box sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img width="400px" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" />
        </Box>
        <Box sx={{ width: "50%", height: "100%" }}>
          <Typography variant="h3" sx={{textAlign:"center"}}>
            Name
          </Typography>
          <Box
            sx={{
              height: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stat name="HP" value="999" />
            <Stat name="HP" value="999" />
            <Stat name="HP" value="999" />
            <Stat name="HP" value="999" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default DetailsPokemon;
