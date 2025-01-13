import { useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoginContext, PokemonsContext } from "context";
import { useUpdateUser } from "hooks";

export const useCreateNewPokemonLogic = () => {
  const { dataUser } = useContext(LoginContext);
  const { pokemons } = useContext(PokemonsContext);
  const { pokemons: pokemonsUser, used_sprites } = dataUser;
  const [imageNumber, setImageNumber] = useState(151);
  const { updateUser } = useUpdateUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const pokemonSchema = z.object({
    name: z
      .string()
      .min(3, "The name must be at least 3 characters long")
      .max(12, "The name cannot be longer than 12 characters")
      .refine((name) => !pokemons.map((pokemon) => pokemon.name.toLowerCase()).includes(name.toLowerCase()), {
        message: "Pokemon name already exists",
      }),
    weight: z.number().min(1, "Weight must be greater than 0").max(9999, "The weight must not exceed 9999"),
    height: z.number().min(1, "Height must be greater than 0").max(9999, "The height must not exceed 9999"),
    experience: z.number().min(0, "Experience must not be negative").max(9999, "Experience must not exceed 9999"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pokemonSchema),
  });

  const onSubmit = (data) => {
    if (imageNumber <= 150 || used_sprites.includes(imageNumber)) {
      enqueueSnackbar("Cannot use this sprite. Please choose another one.", { variant: "error" });
      return;
    }

    const pokemon = {
      id: pokemonsUser?.length + 1,
      data_source_id: `pokeUser_${data.name.toLowerCase()}`,
      name: data.name.toLowerCase(),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageNumber}.png`,
      weight: data.weight,
      height: data.height,
      base_experience: data.experience,
      ability: "No skill",
      favourite: false,
      fought: false,
      won_fights: 0,
      lose_fights: 0,
    };
    dataUser.used_sprites.push(imageNumber);
    pokemonsUser.push(pokemon);
    pokemons.push(pokemon);
    updateUser(dataUser.id, { pokemons: dataUser.pokemons, used_sprites: dataUser.used_sprites });
    enqueueSnackbar(`Successfully created Pokemon ${pokemon.name}`, { variant: "success" });
    navigate("/");
  };

  return {
    register,
    handleSubmit,
    errors,
    imageNumber,
    setImageNumber,
    onSubmit,
    used_sprites,
  };
};
