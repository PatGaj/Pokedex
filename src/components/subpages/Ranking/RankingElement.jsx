import { ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

function RankingElement({ name, base_experience, height, weight, won_fights, image, lp }) {
  return (
    <ListItem>
      <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1" sx={{ marginRight: 1 }}>
          {lp + 1}.
        </Typography>
        <img src={image} alt={`Image ${name}`} style={{ width: 50, marginRight: 10 }} />
        <ListItemText
          primary={
            <Typography
              component="div"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2px",
                justifyContent: "space-between",
                width: "100%",
                fontFamily: "monospace",
              }}
            >
              <span>Name: {name.toUpperCase()}</span>
              <span>Exp: {base_experience}</span>
              <span>Height: {height}</span>
              <span>Weight: {weight}</span>
              <span>Won: {won_fights}</span>
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
export default RankingElement;