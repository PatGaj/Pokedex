import { alpha, Box, Button, TextField, Typography } from "@mui/material";
import { useEditPokemonLogic } from "./useEditPokemonLogic";

function EditPokemon() {
  const { pokemon, register, handleSubmit, handleFormSubmit, errors } = useEditPokemonLogic();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: alpha(theme.palette.background.default, 0.6),
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "auto",
        padding: "25px",
        border: "1px solid #ccc",
      })}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Editing Pokemon
      </Typography>
      <span>{pokemon.name.toUpperCase()}</span>
      <Box
        component="img"
        sx={{ width: "100px", height: "100px" }}
        src={pokemon.image}
        alt={`Pokemon ${pokemon.name} Image`}
      />
      <TextField
        label="Height"
        type="number"
        {...register("height", { valueAsNumber: true })}
        error={!!errors.height}
        helperText={errors.height?.message}
        fullWidth
      />
      <TextField
        label="Weight"
        type="number"
        {...register("weight", { valueAsNumber: true })}
        error={!!errors.weight}
        helperText={errors.weight?.message}
        fullWidth
      />
      <TextField
        label="Experience"
        type="number"
        {...register("experience", { valueAsNumber: true })}
        error={!!errors.experience}
        helperText={errors.experience?.message}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "5px" }}>
        Change attributes
      </Button>
    </Box>
  );
}

export default EditPokemon;
