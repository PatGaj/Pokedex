import { Box, Pagination, Typography } from "@mui/material";
import Tile from "../../shared/Tile/Tile";
function Favorites() {
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
        {/* <Tile /> Miejsce na ulubione pokemony zapisanych w JSON-server. Jeśli lista jest pusta trzeba wyświetlić Komunikat zachęcający do dodania*/}
      </Box>
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> Dodać w przypadku większej ilości fav na stronie niż 15 */}
    </Box>
  );
}

export default Favorites;
