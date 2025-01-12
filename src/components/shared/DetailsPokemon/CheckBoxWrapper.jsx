import { Favorite as FavoriteIcon, StadiumOutlined, FavoriteBorder, Stadium } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { useUpdateUser } from "hooks";
import { ArenaContext, LoginContext } from "context";

function CheckBoxWrapper({ pokemon }) {
  const { dataUser } = useContext(LoginContext);
  const { pokemonsOnArena, addPokemonToArena, removePokemonFromArena, quantityArena } = useContext(ArenaContext);
  const { enqueueSnackbar } = useSnackbar();
  const { updateUser } = useUpdateUser();
  const [favBoxChecked, setFavBoxChecked] = useState(pokemon?.favourite);
  const [arenaBoxChecked, setArenaBoxChecked] = useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <Checkbox
          disabled={quantityArena === 2 && !arenaBoxChecked}
          icon={<StadiumOutlined />}
          checkedIcon={<Stadium />}
          onChange={() => {
            if (!arenaBoxChecked) {
              addPokemonToArena(pokemon);
              enqueueSnackbar(`Successfully added Pokemon ${pokemon.name} to the Arena`, { variant: "success" });
            } else {
              removePokemonFromArena(pokemon);
              enqueueSnackbar(`Successfully removed Pokemon ${pokemon.name} from the Arena`, {
                variant: "success",
              });
            }
            setArenaBoxChecked((prev) => !prev);
          }}
          defaultChecked={pokemonsOnArena.includes(pokemon)}
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
        {quantityArena}/2
      </div>
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<FavoriteIcon />}
        defaultChecked={pokemon?.favourite}
        onChange={() => {
          pokemon.favourite = !favBoxChecked;
          // funkcja isInUserDatabase ta sama co na arenie
          if (!dataUser.pokemons.includes(pokemon)) {
            pokemon.id = dataUser.pokemons.length + 1;
            dataUser.pokemons.push(pokemon);
          }
          // ----
          updateUser(dataUser.id, { pokemons: dataUser.pokemons });
          !favBoxChecked
            ? enqueueSnackbar(`Successfully added Pokemon ${pokemon.name} to Favorite`, { variant: "success" })
            : enqueueSnackbar(`Successfully removed Pokemon ${pokemon.name} from Favorite`, { variant: "success" });
          setFavBoxChecked((prev) => !prev);
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
  );
}

export default CheckBoxWrapper;
