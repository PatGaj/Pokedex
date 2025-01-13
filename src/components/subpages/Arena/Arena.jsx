import { Box, Button } from "@mui/material";
import ArenaTile from "./ArenaTile";
import { useArenaLogic } from "./useArenaLogic";

function Arena() {
  const { first, second, fight, resoult, quantityArena, handleFight, handleLeave } = useArenaLogic();

  return (
    <Box
      sx={() => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: "25px",
        alignItems: "center",
        columnGap: "100px",
      })}
    >
      {!fight ? (
        <Button
          disabled={quantityArena < 2}
          onClick={() => {
            handleFight();
          }}
          variant="contained"
        >
          Fight
        </Button>
      ) : (
        <Button
          onClick={() => {
            handleLeave();
          }}
          variant="contained"
        >
          Leave Arena
        </Button>
      )}

      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-around",
          columnGap: "150px",
          [theme.breakpoints.down("sm")]: { flexDirection: "column", rowGap: "25px" },
        })}
      >
        <Box sx={{ filter: `${(second?.name || "draw") === resoult ? "opacity(50%)" : ""}` }}>
          <ArenaTile pokemon={first} fight={fight} />
        </Box>

        <Box sx={{ filter: `${(first?.name || "draw") === resoult ? "opacity(50%)" : ""}` }}>
          <ArenaTile pokemon={second} fight={fight} />
        </Box>
      </Box>
    </Box>
  );
}
export default Arena;
