import {
  alpha,
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { PokemonsContext } from "../../../context/PokemonsContext";

function Ranking() {
  const { pokemons } = useContext(PokemonsContext);
  const [sort, setSort] = useState("base_experience");
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const sortedPokemons = [...pokemons].sort((a, b) => {
    switch (sort) {
      case "base_experience":
        return b.base_experience - a.base_experience;
      case "weight":
        return b.weight - a.weight;
      case "height":
        return b.height - a.height;
      case "won_fights":
        return b.won_fights - a.won_fights;
      default:
        return 0;
    }
  });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "25px",
      }}
    >
      <FormControl variant="filled" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="base_experience">Base Experience</MenuItem>
          <MenuItem value="weight">Weight</MenuItem>
          <MenuItem value="height">Height</MenuItem>
          <MenuItem value="won_fights">Won Fights</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={(theme) => ({
          height: "80%",
          display: "flex",
          justifyContent: "center",
          overflowY: "scroll",
          overflowX: "hidden",
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          borderRadius: "25px",
        })}
      >
        <List>
          {sortedPokemons.map(
            ({ name, base_experience, height, weight, won_fights, lose_fights, data_source_id, image }, index) => (
              <ListItem key={data_source_id}>
                <ListItemButton>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    {index + 1}.
                  </Typography>
                  <img src={image} alt={name} style={{ width: 50, marginRight: 10 }} />
                  <ListItemText
                    primary={`Name: ${name} | Base Exp: ${base_experience} | Height: ${height} | Weight: ${weight} | Won: ${won_fights} | Lose: ${lose_fights}`}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Box>
  );
}
export default Ranking;
