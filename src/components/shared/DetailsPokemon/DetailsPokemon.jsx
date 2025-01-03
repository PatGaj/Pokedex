import { Box, Checkbox, Typography } from "@mui/material";
import Stat from "../Stat/Stat";
import { Favorite, FavoriteBorder, Stadium } from "@mui/icons-material";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import { useContext, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { PokemonsContext } from "../../../context/PokemonsContext";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

function DetailsPokemon() {
  const { isLogin } = useContext(LoginContext);
  const { dataUser } = useContext(LoginContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const { data_source_id } = useParams();
  const { pokemons } = useContext(PokemonsContext);
  const [quantity, setQuantity] = useState(dataUser ? dataUser.quantity_arena : 0);
  const pokemon = pokemons.find((element) => element.data_source_id === data_source_id);
  const { enqueueSnackbar } = useSnackbar();

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
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {isLogin && (
        <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", height: "50px" }}>
          <div>
            <Checkbox
              disabled={dataUser.quantity_arena === 2 && !pokemon.on_arena}
              icon={<StadiumOutlinedIcon />}
              checkedIcon={<Stadium />}
              onChange={() => {
                pokemon.on_arena = event.target.checked;
                if (dataUser.pokemons.includes(pokemon)) {
                  updatePokemonsForUser(dataUser.id, dataUser.pokemons);
                } else {
                  pokemon.id = dataUser.pokemons.length + 1;
                  dataUser.pokemons.push(pokemon);
                  updatePokemonsForUser(dataUser.id, dataUser.pokemons);
                }
                if (event.target.checked) {
                  dataUser.quantity_arena += 1;
                  enqueueSnackbar(`Successfully added Pokemon ${pokemon.name} to the Arena`, { variant: "success" });
                } else {
                  dataUser.quantity_arena -= 1;
                  enqueueSnackbar(`Successfully removed Pokemon ${pokemon.name} from the Arena`, { variant: "success" });
                }
                updatedQuantityArenaForUser(dataUser.id, dataUser.quantity_arena);
                setQuantity(dataUser.quantity_arena);
              }}
              defaultChecked={pokemon.on_arena}
              sx={{
                alignSelf: "end",
                "& .MuiSvgIcon-root": {
                  fontSize: 40,
                  color: "gray",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "green",
                },
              }}
            />
            {quantity}/2
          </div>

          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            defaultChecked={pokemon.favourite}
            onChange={() => {
              pokemon.favourite = event.target.checked;
              if (dataUser.pokemons.includes(pokemon)) {
                updatePokemonsForUser(dataUser.id, dataUser.pokemons);
              } else {
                pokemon.id = dataUser.pokemons.length + 1;
                dataUser.pokemons.push(pokemon);
                updatePokemonsForUser(dataUser.id, dataUser.pokemons);
              }
              event.target.checked
                ? enqueueSnackbar(`Successfully added Pokemon ${pokemon.name} to Favorite`, { variant: "success" })
                : enqueueSnackbar(`Successfully removed Pokemon ${pokemon.name} from Favorite`, { variant: "success" });
            }}
            sx={{
              alignSelf: "end",
              "& .MuiSvgIcon-root": {
                fontSize: 40,
                color: "gray",
              },
              "&.Mui-checked .MuiSvgIcon-root": {
                color: "red",
              },
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          padding: "25px",
          height: "calc(100% - 50px)",
          display: "flex",
          justifyContent: "space-around",
          border: "1px solid #cccccc",
          borderRadius: "25px",
          opacity: "95%",
          background: `${
            isDarkMode
              ? "linear-gradient(-45deg, #292727, #494949,#292727)"
              : "linear-gradient(-45deg, #c5c5c4, #ffffff,#a7a5a2)"
          }`,
        }}
      >
        <Box
          component="img"
          sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
          src={pokemon.image}
        />
        <Box sx={{ width: "50%", height: "100%" }}>
          <Typography variant="h3" sx={{ textAlign: "center", mt: "50px" }}>
            {pokemon.name}
          </Typography>
          <Box
            sx={{
              height: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stat name="Base Experience" value={pokemon.base_experience} />
            <Stat name="Height" value={pokemon.height} />
            <Stat name="Weight" value={pokemon.weight} />
            <Stat name="Ability" value={pokemon.ability} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default DetailsPokemon;
