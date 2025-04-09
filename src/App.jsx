import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeProvider, alpha, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, GlobalStyles } from "@mui/material";
import { Navigation } from "components/shared";
import { DarkModeContext } from "context";
import useAppLogic from "./useAppLogic";

function App() {
  const { isDarkMode } = useContext(DarkModeContext);
  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  useAppLogic();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            backgroundImage: `${isDarkMode ? "url(/dark_theme.jpg)" : "url(/light_theme.jpg)"}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          },
        }}
      />
      <Navigation />
      <Box
        sx={(theme) => ({
          height: "calc(100vh - 150px - 50px)",
          margin: "25px",
          padding: "25px",
          borderRadius: "25px",
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          [theme.breakpoints.down("md")]: {
            margin: 0,
            borderRadius: 0,
            padding: "10px",
            height: "calc(100vh - 140px)",
          },
        })}
      >
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
export default App;
