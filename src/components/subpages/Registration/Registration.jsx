import { alpha, Box, Button, TextField, Typography } from "@mui/material";
import { useRegistrationLogic } from "./useRegistrationLogic";

function Registration() {
  const { register, handleSubmit, errors, handleRegister } = useRegistrationLogic();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleRegister)}
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
      <Typography variant="h5">Registration</Typography>
      <TextField
        label="Username"
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
        fullWidth
        required
      />
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
      <TextField
        label="Repeat Password"
        type="password"
        {...register("repeatPassword")}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "5px" }}>
        Register
      </Button>
    </Box>
  );
}

export default Registration;
