import { alpha, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useCreateNewPokemonLogic } from "./useCreateNewPokemonLogic";

function CreateNewPokemon() {
  const { register, handleSubmit, errors, imageNumber, setImageNumber, onSubmit, used_sprites } =
    useCreateNewPokemonLogic();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        Create New Pokemon
      </Typography>
      <Box sx={{ display: "flex" }}>
        <IconButton color="primary" aria-label="previous" onClick={() => setImageNumber((prev) => prev - 1)}>
          <ArrowBackIos />
        </IconButton>
        <Box
          component="img"
          sx={{
            width: "100px",
            height:"100px",
            filter: `drop-shadow(-2px -1px 1.5px rgba(0, 0, 0, 0.5)) ${
              used_sprites.includes(imageNumber) || imageNumber <= 150 ? "grayscale(100%)" : ""
            }`,
          }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${imageNumber}.svg`}
          alt="Image Pokemon"
        />
        <IconButton color="primary" aria-label="next" onClick={() => setImageNumber((prev) => prev + 1)}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      <TextField label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} fullWidth />
      <TextField
        label="Weight"
        type="number"
        {...register("weight", { valueAsNumber: true })}
        error={!!errors.weight}
        helperText={errors.weight?.message}
        fullWidth
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
        label="Experience"
        type="number"
        {...register("experience", { valueAsNumber: true })}
        error={!!errors.experience}
        helperText={errors.experience?.message}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "5px" }}>
        Create
      </Button>
    </Box>
  );
}

export default CreateNewPokemon;
