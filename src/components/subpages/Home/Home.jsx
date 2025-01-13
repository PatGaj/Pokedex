import { Box, CircularProgress, Pagination, TextField, Typography } from "@mui/material";
import { Tile } from "components/shared";
import { useHomeLogic } from "./useHomeLogic";
function Home() {
  const { loading, searchTerm, handleSearchChange, page, handlePageChange, currentItems, searchedElements } =
    useHomeLogic();
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
        {loading ? (
          <CircularProgress />
        ) : (
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
        )}
        {searchedElements.length === 0 && <Typography>No pokemons found.</Typography>}
      </Box>
      <Pagination
        count={Math.ceil(searchedElements.length / 15)}
        size="small"
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}
export default Home;
