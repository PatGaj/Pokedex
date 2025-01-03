import { alpha, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useState } from "react";
import { LoginContext } from "../../../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PokemonsContext } from "../../../../context/PokemonsContext";
import { useSnackbar } from "notistack";

function CreateNewPokemon() {
  const { dataUser } = useContext(LoginContext);
  const { pokemons } = useContext(PokemonsContext);
  const existingNames = pokemons.map((pokemon) => pokemon.name);
  const pokemonsUser = dataUser.pokemons;
  const usedSprites = dataUser.used_sprites;
  const [imageNumber, setImageNumber] = useState(151);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const pokemonSchema = z.object({
    name: z
      .string()
      .min(3, "Nazwa musi mieć co najmniej 3 znaki")
      .refine((name) => !existingNames.includes(name), {
        message: "Nazwa Pokemona już istnieje",
      }),
    weight: z.number().min(1, "Waga musi być większa od 0"),
    height: z.number().min(1, "Wysokość musi być większa od 0"),
    experience: z.number().min(0, "Doświadczenie nie może być ujemne"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pokemonSchema),
  });

  async function updatePokemonsForUser(userId, updatedPokemons, updatedUsedSprites) {
    const baseUrl = "http://localhost:3000/users";
    const url = `${baseUrl}/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemons: updatedPokemons, used_sprites: updatedUsedSprites }),
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

  const onSubmit = (data) => {
    if (imageNumber <= 150 || usedSprites.includes(imageNumber)) {
      enqueueSnackbar("Cannot use this sprite. Please choose another one.", { variant: "error" });
      return;
    }

    const pokemon = {
      id: pokemonsUser.length + 1,
      data_source_id: `pokeUser_${data.name}`,
      name: data.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageNumber}.png`,
      weight: data.weight,
      height: data.height,
      base_experience: data.experience,
      ability: "No skill",
      on_arena: false,
      favourite: false,
      fought: false,
      won_fights: 0,
      lose_fights: 0,
    };
    dataUser.used_sprites.push(imageNumber);
    pokemonsUser.push(pokemon);
    updatePokemonsForUser(dataUser.id, pokemonsUser, dataUser.used_sprites);
    enqueueSnackbar(`Successfully created Pokemon ${pokemon.name}`, { variant: "success" });
    navigate("/");
  };

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
        <IconButton color="primary" aria-label="previous" onClick={() => setImageNumber((prev) => prev - 1)}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box
          component="img"
          sx={{
            scale: "1.2",
            filter: `drop-shadow(-2px -1px 1.5px rgba(0, 0, 0, 0.5)) ${
              usedSprites.includes(imageNumber) || imageNumber <= 150 ? "grayscale(100%)" : ""
            }`,
          }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageNumber}.png`}
          alt="Image Pokemon"
        />
        <IconButton color="primary" aria-label="next" onClick={() => setImageNumber((prev) => prev + 1)}>
          <ArrowForwardIosIcon />
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Create
      </Button>
    </Box>
  );
}

export default CreateNewPokemon;
