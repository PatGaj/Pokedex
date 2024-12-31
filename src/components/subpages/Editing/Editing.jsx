import { alpha, Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PokemonsContext } from "../../../context/PokemonsContext";
function Editing() {
  const navigate = useNavigate();
  const { pokemons } = useContext(PokemonsContext);

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
      <Box
        sx={(theme) => ({
          height: "100%",
          width: "30%",
          minWidth: "300px",
          display: "flex",
          justifyContent: "center",
          overflowY: "scroll",
          overflowX: "hidden",
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          borderRadius: "25px",
        })}
      >
        <List>
          {pokemons.map(({ name, image, key }, index) => (
            <ListItem sx={{ p: "0", m: "0" }} key={key}>
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                {index + 1}.
              </Typography>
              <ListItemText primary={`Name: ${name}`} />
              <img src={image} />
              <Button onClick={() => navigate("editpokemon")} variant="contained">
                Edit
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button
        onClick={() => navigate("createnewpokemon")}
        variant="contained"
        sx={{ borderRadius: "25px", width: "30%", height: "80px", minWidth: "300px" }}
      >
        Create New Pokemon
      </Button>
    </Box>
  );
}
export default Editing;
