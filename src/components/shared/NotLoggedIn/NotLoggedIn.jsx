import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotLoggedIn() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "40px",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h4">Access only for Logged-in users</Typography>
      <Link to="/login">
        <Typography variant="h5">Sign In</Typography>
      </Link>
    </Box>
  );
}
export default NotLoggedIn;
