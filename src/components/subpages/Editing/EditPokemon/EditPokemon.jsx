import { alpha, Box, Button, TextField, Typography } from "@mui/material";

function EditPokemon() {
  const height = 0;
  const weight = 0;
  const experience = 0;

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
        Editing Pokemon
      </Typography>
      <span>Pokemon_Name</span>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png" alt="" />
      <TextField label="Height" name="height" type="text" variant="outlined" defaultValue={height} fullWidth />
      <TextField label="Weight" name="weight" type="text" variant="outlined" defaultValue={weight} fullWidth />
      <TextField
        label="Experience"
        name="experience"
        type="text"
        variant="outlined"
        defaultValue={experience}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Change attributes
      </Button>
    </Box>
  );
}
export default EditPokemon;