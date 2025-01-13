import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContextProviders } from "context";
import { RouterProvider } from "react-router-dom";
import { router } from "services";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <ContextProviders>
        <RouterProvider router={router} />
      </ContextProviders>
    </SnackbarProvider>
  </StrictMode>
);
