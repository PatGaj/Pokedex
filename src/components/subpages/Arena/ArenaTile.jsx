import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { Stat } from "components/shared";
import { ArenaContext, DarkModeContext } from "context";

function ArenaTile({ pokemon, fight }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const { removePokemonFromArena } = useContext(ArenaContext);
  const [isAdded, setIsAdded] = useState(Boolean(pokemon));

  const stats = [
    { name: "Exp", value: pokemon?.base_experience },
    { name: "Height", value: pokemon?.height },
    { name: "Weight", value: pokemon?.weight },
    { name: "Ability", value: pokemon?.ability },
  ];

  const cardStyle = {
    display: "flex",
    width: "220px",
    height: "350px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px",
    border: "1px solid #cccccc",
    borderRadius: "8px",
    background: `${
      isDarkMode
        ? "linear-gradient(-45deg, #292727, #494949,#292727)"
        : "linear-gradient(-45deg, #c5c5c4, #ffffff,#a7a5a2)"
    }`,
  };

  return (
    <>
      {isAdded ? (
        <Box sx={{ position: "relative" }}>
          {!fight && (
            <IconButton
              sx={{ position: "absolute", right: "5px", zIndex: "1" }}
              color="primary"
              aria-label="close"
              onClick={() => {
                removePokemonFromArena(pokemon);
                setIsAdded(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          )}

          <Box
            sx={(theme) => ({
              ...cardStyle,
              [theme.breakpoints.down("sm")]: { flexDirection: "row", height: "180px", width: "300px" },
            })}
          >
            <Box
              component="img"
              sx={{
                filter: "drop-shadow(-2px -1px 1.5px rgba(0, 0, 0, 0.5))",
              }}
              src={pokemon?.image}
              alt={`Image Pokemon ${pokemon?.name}`}
            />
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
              <Typography sx={{ textAlign: "center", fontWeight: "600" }}>{pokemon?.name.toUpperCase()}</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  width: "100%",
                  rowGap: "15px",
                }}
              >
                {stats.map((stat) => (
                  <Stat key={stat.name} name={stat.name} value={stat.value} />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={(theme) => ({
            ...cardStyle,
            [theme.breakpoints.down("sm")]: { height: "180px", width: "300px" },
          })}
        >
          <Box component="img" src="/Pokedex.png" sx={{ width: "150px" }} />
        </Box>
      )}
    </>
  );
}
export default ArenaTile;
