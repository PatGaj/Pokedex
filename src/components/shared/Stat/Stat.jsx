import { Box } from "@mui/material";

function Stat({ name, value }) {
  return (
    <Box
      sx={{
        display: "felx",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        flex: "45%",
      }}
    >
      <div>{value}</div>
      <div>
        <strong>{name}</strong>
      </div>
    </Box>
  );
}

export default Stat;
