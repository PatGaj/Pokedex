// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./services/router.jsx";
import { PokemonsProvider } from "./context/PokemonsContext";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <DarkModeProvider>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <LoginProvider>
        <PokemonsProvider>
          <RouterProvider router={router} />
        </PokemonsProvider>
      </LoginProvider>
    </SnackbarProvider>
  </DarkModeProvider>
  // </StrictMode>
);
