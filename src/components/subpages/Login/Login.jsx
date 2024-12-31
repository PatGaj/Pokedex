import { alpha, Box, Button, TextField, Typography } from "@mui/material";
import { LoginContext } from "../../../context/LoginContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setIsLogin, setDataUser } = useContext(LoginContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.length > 0) {
        setIsLogin(true);
        setDataUser(data[0]);
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Something went wrong");
      console.log(error);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleLogin}
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
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value="jan.kowalski@example.com"
        fullWidth
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        value="kowalJan!2"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Sign in
      </Button>
    </Box>
  );
}
export default Login;
