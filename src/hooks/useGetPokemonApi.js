import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export const useGetPokemonApi = (url) => {
  const { data } = useFetch(url);
  const [pokemonsApi, setPokemonsApi] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      if (data) {
        try {
          const pokemonList = data.results;
          const pokemonDetails = await Promise.all(
            pokemonList.map(async (element) => {
              const response = await fetch(element.url);
              const pokemonApi = await response.json();
              const pokemon = {
                data_source_id: `pokeApi_${pokemonApi.name}`,
                name: pokemonApi.name,
                image: pokemonApi.sprites?.other.dream_world.front_default,
                weight: pokemonApi.weight,
                height: pokemonApi.height,
                base_experience: pokemonApi.base_experience,
                ability: pokemonApi.abilities?.[0]?.ability?.name,
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
          console.error("Error while downloading Pokemon data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPokemonDetails();
  }, [data]);
  return { pokemonsApi, loading };
};
