import {
  alpha,
  Box,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
} from "@mui/material";
import { useRankingLogic } from "./useRankingLogic";
import RankingElement from "./RankingElement";

function Ranking() {
  const { sortedPokemons, sort, handleChange } = useRankingLogic();

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
        <InputLabel>Sort by</InputLabel>
        <Select value={sort} onChange={handleChange}>
          <MenuItem value="baseExperience">Base Experience</MenuItem>
          <MenuItem value="weight">Weight</MenuItem>
          <MenuItem value="height">Height</MenuItem>
          <MenuItem value="wonFights">Won Fights</MenuItem>
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
          borderRadius: "14px",
        })}
      >
        <List>
          {sortedPokemons.map(({ name, base_experience, height, weight, won_fights, data_source_id, image }, index) => (
            <RankingElement
              key={data_source_id}
              name={name}
              baseExperience={base_experience}
              height={height}
              weight={weight}
              wonFights={won_fights}
              image={image}
              lp={index}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
}
export default Ranking;
