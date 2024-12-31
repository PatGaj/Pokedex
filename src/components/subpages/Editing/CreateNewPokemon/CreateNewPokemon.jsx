import { alpha, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function CreateNewPokemon() {
  return (
    <Box
      component="form"
      //   onSubmit={handleSubmit}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: alpha(theme.palette.background.default, 0.6),
        borderRadius: "8px",
        maxWidth: 400,
        margin: "auto",
        padding: "25px",
        border: "1px solid #ccc",
        boxShadow: 2,
      })}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Create New Pokemon
      </Typography>
      <Box sx={{ display: "flex" }}>
        <IconButton color="primary" aria-label="previous" onClick={() => console.log("Przycisk kliknięty!")}>
          <ArrowBackIosIcon />
        </IconButton>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png" alt="" />
        <IconButton color="primary" aria-label="next" onClick={() => console.log("Przycisk kliknięty!")}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <TextField label="Name" name="name" type="text" variant="outlined" fullWidth />
      <TextField label="Weight" name="weight" type="text" variant="outlined" fullWidth />
      <TextField label="Height" name="height" type="text" variant="outlined" fullWidth />
      <TextField label="Experience" name="experience" type="text" variant="outlined" fullWidth />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Create
      </Button>
    </Box>
  );
}
export default CreateNewPokemon;
