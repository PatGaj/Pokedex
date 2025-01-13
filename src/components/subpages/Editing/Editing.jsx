import { alpha, Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PokemonsContext } from "context";
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
          {pokemons.map(({ name, image, data_source_id }, index) => (
            <ListItem
              key={data_source_id}
            >

              <ListItemText primary={`${index + 1}. Name: ${name.toUpperCase()}`} />
              <Box component="img" sx={{width:"50px",height:"50px"}} src={image} />
              <Button onClick={() => navigate(`editpokemon/${data_source_id}`)} variant="contained">
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
