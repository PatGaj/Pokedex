import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonsContext, LoginContext } from "context";
import { useUpdateUser } from "hooks";

const schema = z.object({
  height: z.number().min(1, "Height must be at least 1"),
  weight: z.number().min(1, "Weight must be at least 1"),
  experience: z.number().min(0, "Experience cannot be negative"),
});

export const useEditPokemonLogic = () => {
  const { data_source_id } = useParams();
  const { pokemons } = useContext(PokemonsContext);
  const { dataUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const { updateUser } = useUpdateUser();
  const { enqueueSnackbar } = useSnackbar();

  const pokemonsUser = dataUser.pokemons;
  const pokemon = pokemons.find((element) => element.data_source_id === data_source_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      height: pokemon?.height,
      weight: pokemon?.weight,
      experience: pokemon?.base_experience,
    },
  });

  const handleFormSubmit = (data) => {
    pokemon.weight = data.weight;
    pokemon.height = data.height;
    pokemon.base_experience = data.experience;

    if (!pokemonsUser.some((element) => element.data_source_id === pokemon.data_source_id)) {
      pokemon.id = pokemonsUser.length + 1;
      pokemonsUser.push(pokemon);
    }

    updateUser(dataUser.id, { pokemons: dataUser.pokemons });
    enqueueSnackbar(`Successfully edited Pokemon ${pokemon.name}`, { variant: "success" });
    navigate("/");
  };

  return {
    pokemon,
    register,
    handleSubmit,
    handleFormSubmit,
    errors,
  };
};
