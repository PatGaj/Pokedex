import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../../../context/DarkModeContext";
import Stat from "../../../shared/Stat/Stat";
import { LoginContext } from "../../../../context/LoginContext";
import { useNavigate } from "react-router-dom";

function ArenaTile({ pokemon, quan, fight }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const [isAdded, setIsAdded] = useState(Boolean(pokemon));
  const { dataUser } = useContext(LoginContext);
  const navigate = useNavigate();
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

  return (
    <>
      {isAdded ? (
        <Box>
          {!fight && (
            <IconButton
              sx={{ float: "right", position: "relative", left: "-45px", zIndex: "1" }}
              color="primary"
              aria-label="close"
              onClick={() => {
                pokemon.on_arena = false;
                dataUser.quantity_arena -= 1;
                updatePokemonsForUser(dataUser.id, dataUser.pokemons);
                updatedQuantityArenaForUser(dataUser.id, dataUser.quantity_arena);
                setIsAdded(false);
                quan((prev) => prev - 1);
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              width: "220px",
              height: "350px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "25px",
              border: "1px solid #cccccc",
              borderRadius: "25px",
              boxShadow: 4,
              opacity: "90%",
              background: `${
                isDarkMode
                  ? "linear-gradient(-45deg, #292727, #494949,#292727)"
                  : "linear-gradient(-45deg, #c5c5c4, #ffffff,#a7a5a2)"
              }`,
            }}
          >
            <Box
              component="img"
              sx={{
                scale: "1.2",
                filter: "drop-shadow(-2px -1px 1.5px rgba(0, 0, 0, 0.5))",
                zIndex: "-1",
              }}
              src={pokemon.image}
              alt={`Image Pokemon ${pokemon.name}`}
            />
            <Typography variant="h4" gutterBottom>
              {pokemon.name}
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", width: "100%", rowGap: "25px" }}
            >
              <Stat name="Base Experience" value={pokemon.base_experience} />
              <Stat name="Height" value={pokemon.height} />
              <Stat name="Weight" value={pokemon.weight} />
              <Stat name="Ability" value={pokemon.ability} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            width: "220px",
            height: "350px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px",
            border: "1px solid #cccccc",
            borderRadius: "25px",
            boxShadow: 4,
            opacity: "90%",
            cursor: "pointer",
            background: `${
              isDarkMode
                ? "linear-gradient(-45deg, #292727, #494949,#292727)"
                : "linear-gradient(-45deg, #c5c5c4, #ffffff,#a7a5a2)"
            }`,
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        >
          <img src="/Pokedex.png" width="150" alt="" />
          <AddIcon sx={{ fontSize: "100px" }} />
        </Box>
      )}
    </>
  );
}
export default ArenaTile;
