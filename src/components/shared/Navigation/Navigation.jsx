import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "context";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  Person,
  Stadium,
  Favorite as FavoriteIcon,
  Stars,
  Tune,
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAddAlt1,
} from "@mui/icons-material";

import { ThemeSwitch } from "components/shared";

function Navigation() {
  const { isLogin, dataUser, logout } = useContext(LoginContext);

  const navigate = useNavigate();

  const loggedInActions = [
    { label: "Favorites", icon: <FavoriteIcon />, handleClick: () => navigate("favourites") },
    { label: "Arena", icon: <Stadium />, handleClick: () => navigate("arena") },
    { label: "Ranking", icon: <Stars />, handleClick: () => navigate("ranking") },
    { label: "Editing", icon: <Tune />, handleClick: () => navigate("editing") },
    {
      label: "Log Out",
      icon: <LogoutIcon />,
      handleClick: () => {
        logout();
        navigate("/");
      },
    },
  ];

  const loggedOutActions = [
    { label: "Log In", icon: <LoginIcon />, handleClick: () => navigate("login") },
    { label: "Register", icon: <PersonAddAlt1 />, handleClick: () => navigate("registration") },
  ];

  const actions = isLogin ? loggedInActions : loggedOutActions;
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        margin: "0 72px",
        padding: "0 60px",
        borderRadius: "0 0 60px 60px",
        border: "solid 1px",
        boxShadow: "0px 0px 10px 1px",
        borderTop: "none",
        [theme.breakpoints.down("md")]: {
          border: "none",
          borderRadius: 0,
          margin: 0,
          padding: 0,
        },
      })}
    >
      <Box
        sx={() => ({
          display: "flex",
          height: "85px",
          justifyContent: "space-between",
          padding: "0 10px",
        })}
      >
        <Box
          component="img"
          src="/Pokedex.png"
          onClick={() => navigate("/")}
          sx={{ width: "200px", cursor: "pointer" }}
        />
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            columnGap: "25px",
            [theme.breakpoints.down("sm")]: { flexDirection: "column" },
          })}
        >
          {isLogin && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Person fontSize="large" /> <span>{dataUser.username}</span>
            </Box>
          )}

          <ThemeSwitch />
        </Box>
      </Box>
      <BottomNavigation
        sx={(theme) => ({
          display: "flex",
          justifyContent: "end",
          height: "55px",
          [theme.breakpoints.down("sm")]: { justifyContent: "center" },
        })}
        showLabels
      >
        {actions.map((action, index) => (
          <BottomNavigationAction
            key={index}
            sx={(theme) => ({
              minWidth: "80px",
              maxWidth: "100px",
              padding: 0,
              [theme.breakpoints.down("sm")]: { minWidth: "40px", maxWidth: "60px" },
            })}
            label={action.label}
            icon={action.icon}
            onClick={action.handleClick}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}

export default Navigation;
