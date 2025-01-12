import { Box, Typography } from "@mui/material";
import { Stat } from "components/shared";
import { DarkModeContext } from "context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Tile({
  name,
  image,
  weight,
  height,
  baseExperience,
  ability,
  fought,
  won_fights,
  lose_fights,
  data_source_id,
}) {
  const { isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const stats = [
    { name: "Exp", value: baseExperience },
    { name: "Height", value: height },
    { name: "Weight", value: weight },
    { name: "Ability", value: ability },
  ];

  return (
    <Box
      onClick={() => navigate(`details/${data_source_id}`)}
      sx={{
        display: "flex",
        width: "220px",
        height: "350px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "25px",
        border: "1px solid #cccccc",
        borderRadius: "8px",
        cursor: "pointer",
        opacity: "90%",
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
      {fought && (
        <Box
          sx={{
            width: "100px",
            position: "relative",
            top: "-10px",
            textAlign: "center",
            border: "solid 1px #cccccc",
            borderRadius: "8px",
            backgroundColor: "#8b8b8ba6",
          }}
        >
          W:{won_fights} L:{lose_fights}
        </Box>
      )}
      <Box
        component="img"
        sx={{
          scale: "1.2",
          filter: "drop-shadow(-2px -1px 1.5px rgba(0, 0, 0, 0.5))",
        }}
        src={image}
        alt={`Image Pokemon ${name}`}
      />
      <Typography fontSize="1.5rem" fontWeight="600" gutterBottom>
        {name.toUpperCase()}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", width: "100%", rowGap: "25px" }}>
        {stats.map((stat) => (
          <Stat key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </Box>
    </Box>
  );
}
export default Tile;
