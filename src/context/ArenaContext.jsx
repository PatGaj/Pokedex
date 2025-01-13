import { createContext, useState } from "react";

export const ArenaContext = createContext();

export function ArenaProvider({ children }) {
  const [pokemonsOnArena, setPokemonsOnArena] = useState([null, null]);
  const [quantityArena, setQuantityArena] = useState(0);

  const addPokemonToArena = (pokemon) => {
    setPokemonsOnArena((prev) => {
      const newOnArena = [...prev];
      if (newOnArena[0] === null) {
        newOnArena[0] = pokemon;
      } else if (newOnArena[1] === null) {
        newOnArena[1] = pokemon;
      }
      return newOnArena;
    });
    setQuantityArena((prev) => prev + 1);
  };

  const removePokemonFromArena = (pokemon) => {
    setPokemonsOnArena((prev) => {
      const newArena = [...prev];
      const index = newArena.findIndex((element) => element === pokemon);
      if (index !== -1) {
        newArena[index] = null;
      }
      return newArena;
    });
    setQuantityArena((prev) => prev - 1);
  };

  const resetArena = () => {
    setPokemonsOnArena([null, null]);
    setQuantityArena(0);
  };

  return (
    <ArenaContext.Provider
      value={{ pokemonsOnArena, addPokemonToArena, removePokemonFromArena, resetArena, quantityArena }}
    >
      {children}
    </ArenaContext.Provider>
  );
}
