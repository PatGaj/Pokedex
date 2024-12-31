import { Box, Pagination, TextField } from "@mui/material";
import Tile from "../../shared/Tile/Tile";
import { useContext } from "react";
import { PokemonsContext } from "../../../context/PokemonsContext";
function Home() {
  const { pokemons } = useContext(PokemonsContext);
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "25px",
      }}
    >
      <TextField id="filled-basic" label="Search" variant="filled" />
      <Box
        sx={{
          height: "80%",
          width: "100%",
          display: "flex",
          gap: "25px",
          padding: "10px 0",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "scroll",
        }}
      >
        {pokemons &&
          pokemons.map(
            ({ key, name, image, weight, height, base_experience, ability, fought, lose_fights, won_fights }) => (
              <Tile
                key={key}
                name={name}
                image={image}
                weight={weight}
                height={height}
                baseExperience={base_experience}
                ability={ability || "Brak zdolności"}
                fought={fought}
                lose_fights={lose_fights}
                won_fights={won_fights}
              />
            )
          )}
      </Box>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Box>
  );
}
export default Home;
