import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export const useGetPokemonApi = (url) => {
  const { data } = useFetch(url);
  const [pokemonsApi, setPokemonsApi] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (data) {
        try {
          const pokemonList = data.results;
          const pokemonDetails = await Promise.all(
            pokemonList.map(async (element) => {
              const response = await fetch(element.url);
              const pokemonApi = await response.json();
              const pokemon = {
                key: `pokeApi_${pokemonApi.name}`,
                name: pokemonApi.name,
                image: pokemonApi.sprites?.front_default,
                weight: pokemonApi.weight,
                height: pokemonApi.height,
                base_experience: pokemonApi.base_experience,
                ability: pokemonApi.abilities?.[0]?.ability?.name,
                on_arena: false,
                favourite: false,
                fought: false,
                won_fights: 0,
                lose_fights: 0,
              };
              return pokemon;
            })
          );
          setPokemonsApi(pokemonDetails);
        } catch (err) {
          console.error("Błąd podczas pobierania danych Pokemonów:", err);
        }
      }
    };

    fetchPokemonDetails();
  }, [data]);
  return { pokemonsApi };
};
