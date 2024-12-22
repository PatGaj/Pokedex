import { Box } from "@mui/material";

function Stats({ name, value }) {
  return (
    <Box
      sx={{
        display: "felx",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width:"50%"
      }}
    >
      <div>{value}</div>
      <div><strong>{name}</strong></div>
    </Box>
  );
}

export default Stats;
