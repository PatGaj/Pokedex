import { alpha, Box, Button, TextField, Typography } from "@mui/material";
import { useLoginLogic } from "./useLoginLogic";

function Login() {
  const { register, handleSubmit, errors, handleLogin } = useLoginLogic();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: alpha(theme.palette.background.default, 0.6),
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "auto",
        padding: "25px",
        border: "1px solid #ccc",
      })}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "5px" }}>
        Sign in
      </Button>
    </Box>
  );
}

export default Login;
