import { alpha, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonsContext } from "../../../../context/PokemonsContext";
import { useContext } from "react";
import { LoginContext } from "../../../../context/LoginContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSnackbar } from "notistack";

const schema = z.object({
  height: z.number().min(1, "Height must be at least 1"),
  weight: z.number().min(1, "Weight must be at least 1"),
  experience: z.number().min(0, "Experience cannot be negative"),
});

function EditPokemon() {
  const { data_source_id } = useParams();
  const { pokemons } = useContext(PokemonsContext);
  const { dataUser } = useContext(LoginContext);
  const pokemonsUser = dataUser.pokemons;
  const pokemon = pokemons.find((element) => element.data_source_id === data_source_id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      height: pokemon.height,
      weight: pokemon.weight,
      experience: pokemon.base_experience,
    },
  });

  async function updatePokemonsForUser(userId, updatedPokemons) {
    const baseUrl = "http://localhost:3000/users";
    const url = `${baseUrl}/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemons: updatedPokemons }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Successfully updated pokemons:", data);
      return data;
    } catch (error) {
      console.error("Error updating pokemons:", error);
    }
  }

  const handleFormSubmit = (data) => {
    pokemon.weight = data.weight;
    pokemon.height = data.height;
    pokemon.base_experience = data.experience;

    if (!pokemonsUser.some((p) => p.data_source_id === pokemon.data_source_id)) {
      pokemon.id = pokemonsUser.length + 1;
      pokemonsUser.push(pokemon);
    }

    updatePokemonsForUser(dataUser.id, pokemonsUser);
    enqueueSnackbar(`Successfully edited Pokemon ${pokemon.name}`, { variant: "success" });
    navigate("/");
  };

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
      <span>{pokemon.name}</span>
      <Box component="img" src={pokemon.image} alt="" />
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Change attributes
      </Button>
    </Box>
  );
}

export default EditPokemon;
