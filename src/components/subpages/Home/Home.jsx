import { Box, Pagination, TextField } from "@mui/material";
import Tile from "../../shared/Tile/Tile";

function Home() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "25px",
        
      }}
    >
      <TextField id="filled-basic" label="Search" variant="filled" />
      <Box
        sx={{
          height: "80%",
          width:"100%",
          display: "flex",
          gap: "25px",
          padding:"10px 0",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "scroll",
        }}
      >
        <Tile />

      </Box>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Box>
  );
}
export default Home;
