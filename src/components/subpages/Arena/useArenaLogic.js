import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ArenaContext, LoginContext } from "context";
import { useUpdateUser } from "hooks";

export const useArenaLogic = () => {
  const { dataUser } = useContext(LoginContext);
  const { pokemonsOnArena, resetArena, quantityArena } = useContext(ArenaContext);
  const first = pokemonsOnArena[0];
  const second = pokemonsOnArena[1];
  const [fight, setFight] = useState(false);
  const [resoult, setResoult] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { updateUser } = useUpdateUser();
  const navigate = useNavigate();

  const isInUserDatabase = (pokemon) => {
    if (!dataUser.pokemons.includes(pokemon)) {
      pokemon.id = dataUser.pokemons.length + 1;
      dataUser.pokemons.push(pokemon);
    }
  };

  const sparring = (pokemonFirst, pokemonSecond) => {
    isInUserDatabase(pokemonFirst);
    isInUserDatabase(pokemonSecond);
    const pokemonFirstScore = pokemonFirst.base_experience * pokemonFirst.weight;
    const pokemonSecondScore = pokemonSecond.base_experience * pokemonSecond.weight;
    if (pokemonFirstScore === pokemonSecondScore) {
      setResoult("draw");
      enqueueSnackbar("The fight ended in a draw", { variant: "info" });
    } else {
      const winner = pokemonFirstScore > pokemonSecondScore ? pokemonFirst : pokemonSecond;
      const loser = pokemonFirstScore > pokemonSecondScore ? pokemonSecond : pokemonFirst;
      setResoult(winner.name);
      winner.base_experience += 10;
      winner.won_fights += 1;
      loser.lose_fights += 1;
      enqueueSnackbar(`The fight was won by the pokemon ${winner.name}`, { variant: "info" });
    }
  };

  const handleFight = () => {
    sparring(first, second);
    first.fought = true;
    second.fought = true;
    setFight(true);
    updateUser(dataUser.id, { pokemons: dataUser.pokemons });
  };

  const handleLeave = () => {
    resetArena();
    navigate("/");
  };

  return {
    first,
    second,
    fight,
    resoult,
    quantityArena,
    handleFight,
    handleLeave,
  };
};
