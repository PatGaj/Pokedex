import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PokemonsContext, DarkModeContext, LoginContext } from "context";
import { Box, Typography } from "@mui/material";
import { Stat } from "components/shared";
import CheckBoxWrapper from "./CheckBoxWrapper";

function DetailsPokemon() {
  const { data_source_id } = useParams();

  const { isLogin } = useContext(LoginContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const { pokemons } = useContext(PokemonsContext);

  const pokemon = pokemons.find((element) => element.data_source_id === data_source_id);
  const { fought, lose_fights, won_fights, image, name, weight, height, base_experience, ability } = pokemon || {};

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {isLogin && <CheckBoxWrapper pokemon={pokemon} />}
      <Box
        sx={(theme) => ({
          width: "100%",
          border: "1px solid #cccccc",
          position: "relative",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          background: `${
            isDarkMode
              ? "linear-gradient(-45deg, #292727, #494949,#292727)"
              : "linear-gradient(-45deg, #c5c5c4, #ffffff,#a7a5a2)"
          }`,
          [theme.breakpoints.down("md")]: { alignItems: "center", flexDirection: "column" },
        })}
      >
        {fought && (
          <Box sx={{ position: "absolute", top: 25, left: 25 }}>
            <Typography fontWeight="600">WIN:{won_fights}</Typography>
            <Typography>LOSE:{lose_fights}</Typography>
          </Box>
        )}
        <Box
          component="img"
          sx={(theme) => ({
            height: "400px",
            filter: "drop-shadow(-10px 5px 5px rgba(0, 0, 0, 0.5))",
            [theme.breakpoints.down("md")]: { width: "200px" },
          })}
          src={image}
        />
        <Box sx={() => ({ marginTop: "50px" })}>
          <Typography sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "600" }}>
            {name?.toUpperCase()}
          </Typography>
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              columnGap: "10px",
              rowGap: "25px",
              margin: "25px 0",
              [theme.breakpoints.down("md")]: { columnGap: "30px", rowGap: "10px" },
            })}
          >
            <Stat name="Height" value={height} />
            <Stat name="Weight" value={weight} />
            <Stat name="Ability" value={ability} />
            <Stat name="Base Experience" value={base_experience} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default DetailsPokemon;
