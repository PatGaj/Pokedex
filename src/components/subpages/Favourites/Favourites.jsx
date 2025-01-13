import { Box, Typography } from "@mui/material";
import { Tile } from "components/shared";
import { LoginContext } from "context";
import { useContext } from "react";

function Favorites() {
  const { dataUser } = useContext(LoginContext);
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
      <Typography variant="h2">Favorites</Typography>
      <Box
        sx={{
          height: "80%",
          width: "100%",
          display: "flex",
          gap: "25px",
          padding: "10px 0",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {dataUser.pokemons.filter((pokemon) => pokemon.favourite).length > 0 ? (
          dataUser.pokemons.map(
            ({
              data_source_id,
              name,
              image,
              weight,
              height,
              base_experience,
              ability,
              fought,
              lose_fights,
              won_fights,
              favourite,
            }) =>
              favourite && (
                <Tile
                  key={data_source_id}
                  dataSourceId={data_source_id}
                  name={name}
                  image={image}
                  weight={weight}
                  height={height}
                  baseExperience={base_experience}
                  ability={ability}
                  fought={fought}
                  loseFights={lose_fights}
                  wonFights={won_fights}
                />
              )
          )
        ) : (
          <Typography variant="h5">
            {"It looks like you don't have any favourite Pokemon yet. Add some to your favourites!"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Favorites;
