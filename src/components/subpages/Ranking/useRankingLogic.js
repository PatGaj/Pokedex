import { useState, useContext } from "react";
import { PokemonsContext } from "context";

export const useRankingLogic = () => {
  const { pokemons } = useContext(PokemonsContext);
  const [sort, setSort] = useState("base_experience");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const sortedPokemons = [...pokemons].sort((a, b) => {
    switch (sort) {
      case "base_experience":
        return b.base_experience - a.base_experience;
      case "weight":
        return b.weight - a.weight;
      case "height":
        return b.height - a.height;
      case "won_fights":
        return b.won_fights - a.won_fights;
      default:
        return 0;
    }
  });

  return { sortedPokemons, sort, handleChange };
};