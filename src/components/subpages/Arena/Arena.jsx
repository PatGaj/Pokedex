import { Box, Button } from "@mui/material";
import { ArenaContext } from "../../../context/ArenaContext";
import { useContext } from "react";
import ArenaTile from "./ArenaTile/ArenaTile";
import NotLoggedIn from "../../shared/NotLoggedIn/NotLoggedIn";
import { LoginContext } from "../../../context/LoginContext";
function Arena() {
  const { arenaFull } = useContext(ArenaContext);
  const { isLogin } = useContext(LoginContext);
  if (!isLogin) {
    return <NotLoggedIn />;
  }
  return (
    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", columnGap: "100px" }}>
      <ArenaTile />
      <Button disabled={!arenaFull} variant="contained">
        Fight
      </Button>
      <ArenaTile />
    </Box>
  );
}
export default Arena;
