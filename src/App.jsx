import Navigation from "./components/shared/Navigation/Navigation";
import { ThemeProvider, alpha, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, GlobalStyles } from "@mui/material";
import { DarkModeContext } from "./context/DarkModeContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const { isDarkMode } = useContext(DarkModeContext);
  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            backgroundImage: `${isDarkMode ? "url(/dark_theme.jpg)" : "url(/light_theme.jpg)"}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            transition: "background-image 0.3s ease-in-out",
          },
        }}
      />
      <Navigation />
      <Box
        sx={(theme) => ({
          height: "calc(100vh - 110px - 50px)",
          margin: "25px",
          padding: "25px",
          borderRadius: "25px",
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          [theme.breakpoints.down("md")]: {
            height: "calc(100vh - 220px - 50px)",
          },
        })}
      >
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
export default App;
