import { alpha, Box, Button, TextField, Typography } from "@mui/material";

function Registration() {
  return (
    <Box
      component="form"
      // onSubmit={handleSubmit}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: alpha(theme.palette.background.default, 0.6),
        borderRadius: "8px",
        maxWidth: 400,
        margin: "auto",
        padding: "25px",
        border: "1px solid #ccc",
        boxShadow: 2,
      })}
    >
      <Typography variant="h5">Registration</Typography>
      <TextField label="Firstname" name="firstname" type="text" variant="outlined" fullWidth required />
      <TextField label="Email" name="email" type="email" variant="outlined" fullWidth required />
      <TextField label="Password" name="password" type="password" variant="outlined" fullWidth required />
      <TextField
        label="Repeat Password"
        name="repeatPassword"
        type="password"
        variant="outlined"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
}
export default Registration;
