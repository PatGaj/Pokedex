import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </DarkModeProvider>
  </StrictMode>
);
