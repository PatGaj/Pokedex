import { Box, CircularProgress, Pagination, TextField } from "@mui/material";
import Tile from "../../shared/Tile/Tile";
import { useContext, useState } from "react";
import { PokemonsContext } from "../../../context/PokemonsContext";
function Home() {
  const { pokemons } = useContext(PokemonsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const searchedElements = pokemons.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = searchedElements.slice(startIndex, endIndex);

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
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
      <TextField label="Search" variant="filled" value={searchTerm} onChange={handleSearchChange} />
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
        {pokemons.length>0 ? (
          currentItems.map(
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
            }) => (
              <Tile
                key={data_source_id}
                data_source_id={data_source_id}
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
          )
        ) : (
          <CircularProgress />
        )}
      </Box>
      <Pagination
        count={Math.ceil(searchedElements.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}
export default Home;
