// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./services/router.jsx";
import { ArenaProvider } from "./context/ArenaContext";
import { PokemonsProvider } from "./context/PokemonsContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <DarkModeProvider>
    <LoginProvider>
      <PokemonsProvider>
        <ArenaProvider>
          <RouterProvider router={router} />
        </ArenaProvider>
      </PokemonsProvider>
    </LoginProvider>
  </DarkModeProvider>
  // </StrictMode>
);
