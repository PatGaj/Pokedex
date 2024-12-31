import { createContext, useEffect, useState } from "react";

export const ArenaContext = createContext();

export function ArenaProvider({ children }) {
  const [inArena, setInArena] = useState(0);
  const [arenaFull, setArenaFull] = useState(false);
  useEffect(() => {
    if (inArena === 2) {
      setArenaFull(true);
    } else {
      setArenaFull(false);
    }
  }, [inArena]);

  return <ArenaContext.Provider value={{ arenaFull, inArena, setInArena }}>{children}</ArenaContext.Provider>;
}
