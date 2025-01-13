import { LoginProvider } from "./LoginContext";
import { PokemonsProvider } from "./PokemonsContext";
import { ArenaProvider } from "./ArenaContext";
import { DarkModeProvider } from "./DarkModeContext";

function ContextProviders({ children }) {
  return (
    <DarkModeProvider>
      <LoginProvider>
        <PokemonsProvider>
          <ArenaProvider>{children}</ArenaProvider>
        </PokemonsProvider>
      </LoginProvider>
    </DarkModeProvider>
  );
}

export default ContextProviders;
