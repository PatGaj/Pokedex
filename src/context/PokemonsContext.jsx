import { createContext, useContext, useState, useEffect } from "react";
import { useGetPokemonApi } from "../hooks/useGetPokemonApi";
import { LoginContext } from "./LoginContext";

export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pokemonsApi } = useGetPokemonApi("https://pokeapi.co/api/v2/pokemon?limit=150");
  const { isLogin, dataUser } = useContext(LoginContext);

  const mergeArrays = (arrayA, arrayB) => {
    const mergedMap = new Map([
      ...arrayA.map((item) => [item.data_source_id, item]),
      ...arrayB.map((item) => [item.data_source_id, item]),
    ]);
    return Array.from(mergedMap.values());
  };

  useEffect(() => {
    setLoading(true);
    try {
      if (!pokemonsApi.length) return;

      if (isLogin && dataUser?.pokemons?.length > 0) {
        const mergePokemons = mergeArrays(pokemonsApi, dataUser.pokemons);
        setPokemons(mergePokemons);
      } else {
        setPokemons(pokemonsApi);
      }
    } finally {
      setLoading(false);
    }
  }, [pokemonsApi, isLogin, dataUser]);

  return <PokemonsContext.Provider value={{ pokemons, loading }}>{children}</PokemonsContext.Provider>;
}
