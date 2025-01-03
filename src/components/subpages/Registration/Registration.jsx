import { alpha, Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .regex(/[A-Z]/, "Hasło musi zawierać co najmniej 1 dużą literę")
      .regex(/\d/, "Hasło musi zawierać co najmniej 1 cyfrę")
      .regex(/[@$!%*?&]/, "Hasło musi zawierać co najmniej 1 znak specjalny (@$!%*?&))"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function checkUserExists(email) {
    const url = `http://localhost:3000/users?email=${email}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const users = await response.json();
        return users.length > 0;
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
    }
    return false;
  }

  async function createUser(newUser) {
    const url = "http://localhost:3000/users";

    try {
      const userExists = await checkUserExists(newUser.email);
      if (userExists) {
        enqueueSnackbar("User already exists with this email", { variant: "error" });
        return;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`Failed to create user. Status: ${response.status}`);
      }

      const data = await response.json();
      enqueueSnackbar("User created successfully!", { variant: "success" });
      navigate("/");
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      enqueueSnackbar("Failed to create user", { variant: "error" });
    }
  }

  const onSubmit = (data) => {
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      used_sprites: [],
      quantity_arena: 0,
      pokemons: [],
    };
    createUser(newUser);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
}

export default Registration;
