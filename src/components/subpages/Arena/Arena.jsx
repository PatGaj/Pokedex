import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ArenaTile from "./ArenaTile/ArenaTile";
import NotLoggedIn from "../../shared/NotLoggedIn/NotLoggedIn";
import { LoginContext } from "../../../context/LoginContext";
import { useSnackbar } from "notistack";
function Arena() {
  const { isLogin, dataUser } = useContext(LoginContext);
  const pokemonsOnArena = dataUser.pokemons.filter((pokemon) => pokemon.on_arena);
  const [first, setFirst] = useState(pokemonsOnArena[0]);
  const [second, setSecond] = useState(pokemonsOnArena[1]);
  const [firstWin, setFirstWin] = useState(false);
  const [secondWin, setSecondWin] = useState(false);
  const [draw, setDraw] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [quan, setQuan] = useState(pokemonsOnArena.length);
  const [fight, setFight] = useState(false);

  async function updatePokemonsForUser(userId, updatedPokemons) {
    const baseUrl = "http://localhost:3000/users";
    const url = `${baseUrl}/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH", // Metoda PATCH, aby częściowo zaktualizować użytkownika
        headers: {
          "Content-Type": "application/json", // Określenie formatu danych
        },
        body: JSON.stringify({ pokemons: updatedPokemons }), // Przesłanie nowej listy pokemonów
      });

      if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const data = await response.json(); // Odbiór zaktualizowanych danych
      console.log("Successfully updated pokemons:", data);
      return data;
    } catch (error) {
      console.error("Error updating pokemons:", error);
    }
  }

  async function updatedQuantityArenaForUser(userId, updatedQuantityArena) {
    const baseUrl = "http://localhost:3000/users";
    const url = `${baseUrl}/${userId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH", // Metoda PATCH, aby częściowo zaktualizować użytkownika
        headers: {
          "Content-Type": "application/json", // Określenie formatu danych
        },
        body: JSON.stringify({ quantity_arena: updatedQuantityArena }), // Przesłanie nowej listy pokemonów
      });

      if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const data = await response.json(); // Odbiór zaktualizowanych danych
      console.log("Successfully updated pokemons:", data);
      return data;
    } catch (error) {
      console.error("Error updating pokemons:", error);
    }
  }

  const handleClick = () => {
    setFight(true);
    first.fought = true;
    second.fought = true;
    if (first.base_experience * first.weight === second.base_experience * second.weight) {
      setDraw(true);
      enqueueSnackbar("The fight ended in a draw", { variant: "info" });
    } else if (first.base_experience * first.weight > second.base_experience * second.weight) {
      first.base_experience += 10;
      first.won_fights += 1;
      second.lose_fights += 1;
      setFirstWin(true);
      enqueueSnackbar(`The fight was won by the pokemon ${first.name}`, { variant: "info" });
    } else {
      second.base_experience += 10;
      second.won_fights += 1;
      first.lose_fights += 1;
      setSecondWin(true);
      enqueueSnackbar(`The fight was won by the pokemon ${second.name}`, { variant: "info" });
    }
    first.on_arena = false;
    second.on_arena = false;
    dataUser.quantity_arena -= 2;
    updatePokemonsForUser(dataUser.id, dataUser.pokemons);
    updatedQuantityArenaForUser(dataUser.id, dataUser.quantity_arena);
    setQuan(0);
  };

  if (!isLogin) {
    return <NotLoggedIn />;
  }
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: "25px",
        alignItems: "center",
        columnGap: "100px",
      }}
    >
      <Button
        disabled={quan < 2}
        onClick={() => {
          handleClick();
        }}
        variant="contained"
      >
        Fight
      </Button>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
        {draw && <Typography>Draw</Typography>}
        <Box sx={{ filter: `${secondWin ? "grayscale(100%)" : ""}` }}>
          <ArenaTile pokemon={first} quan={setQuan} fight={fight} />
        </Box>
        <Box sx={{ filter: `${firstWin ? "grayscale(100%)" : ""}` }}>
          <ArenaTile pokemon={second} quan={setQuan} fight={fight} />
        </Box>
      </Box>
    </Box>
  );
}
export default Arena;
