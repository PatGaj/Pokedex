import { createContext, useContext, useState, useEffect } from "react";
import { useGetPokemonApi } from "../hooks/useGetPokemonApi";
import { LoginContext } from "./LoginContext";

export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const { pokemonsApi } = useGetPokemonApi("https://pokeapi.co/api/v2/pokemon?limit=150");
  const { isLogin, dataUser } = useContext(LoginContext);

  // Funkcja do łączenia tablic
  const mergeArrays = (arrayA, arrayB) => {
    const mergedMap = new Map();

    arrayA.forEach((item) => mergedMap.set(item.key, item));
    arrayB.forEach((item) => mergedMap.set(item.key, item));

    return Array.from(mergedMap.values());
  };

  // useEffect do aktualizacji pokemons po załadowaniu danych
  useEffect(() => {
    if (pokemonsApi.length > 0) {
      if (isLogin && dataUser?.pokemons?.length > 0) {
        const mergePokemons = mergeArrays(pokemonsApi, dataUser.pokemons);
        setPokemons(mergePokemons);
      } else {
        setPokemons(pokemonsApi);
      }
    }
  }, [pokemonsApi, isLogin, dataUser]);

  return (
    <PokemonsContext.Provider value={{ pokemons }}>
      {children}
    </PokemonsContext.Provider>
  );
}
