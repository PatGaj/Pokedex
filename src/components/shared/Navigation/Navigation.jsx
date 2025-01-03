import { useContext } from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarsIcon from "@mui/icons-material/Stars";
import TuneIcon from "@mui/icons-material/Tune";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonIcon from "@mui/icons-material/Person";
import { LoginContext } from "../../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function Navigation() {
  const { isLogin, setIsLogin, dataUser, setDataUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const logOut = () => {
    setIsLogin(false);
    setDataUser([]);
    enqueueSnackbar("Successfully logged out", { variant: "success" });
    navigate("/");
  };

  const loggedInActions = [
    { label: "Favorites", icon: <FavoriteIcon />, handleClick: () => navigate("favourites") },
    { label: "Arena", icon: <StadiumIcon />, handleClick: () => navigate("arena") },
    { label: "Ranking", icon: <StarsIcon />, handleClick: () => navigate("ranking") },
    { label: "Editing", icon: <TuneIcon />, handleClick: () => navigate("editing") },
    { label: "Log Out", icon: <LogoutIcon />, handleClick: logOut },
  ];
  const loggedOutActions = [
    { label: "Log In", icon: <LoginIcon />, handleClick: () => navigate("login") },
    { label: "Register", icon: <PersonAddAlt1Icon />, handleClick: () => navigate("registration") },
  ];

  const actions = isLogin ? loggedInActions : loggedOutActions;
  return (
    <Box
      sx={(theme) => ({
        height: "110px",
        display: "flex",
        justifyContent: "space-between",
        margin: "0 72px",
        padding: "0 50px 0 0",
        borderRadius: "0 0 60px 60px",
        border: "solid 1px",
        boxShadow: "0px 0px 10px 1px",
        borderTop: "none",
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down("md")]: {
          height: "220px",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          margin: "0",
          borderRadius: "0",
          padding: "0",
        },
      })}
    >
      <Box
        onClick={() => navigate("/")}
        sx={(theme) => ({
          padding: "10px 0 0 30px",
          cursor: "pointer",
          [theme.breakpoints.down("md")]: { padding: "10px 0 0 0" },
        })}
      >
        <img src="/Pokedex.png" width="220" alt="" />
      </Box>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", columnGap: "25px" }}>
          {isLogin && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PersonIcon fontSize="large" /> <span>{dataUser.username}</span>
            </Box>
          )}

          <ThemeSwitch />
        </Box>
        <BottomNavigation sx={{ display: "flex", flexWrap: "wrap" }} showLabels>
          {actions.map((action, index) => (
            <BottomNavigationAction key={index} label={action.label} icon={action.icon} onClick={action.handleClick} />
          ))}
        </BottomNavigation>
      </Box>
    </Box>
  );
}

export default Navigation;
