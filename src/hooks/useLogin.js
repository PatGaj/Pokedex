import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { LoginContext } from "context";

const useLogin = () => {
  const navigate = useNavigate();
  const { setIsLogin, setDataUser } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();

  const tryLogin = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/users?email=${data.email}&password=${data.password}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userData = await response.json();
      if (userData.length > 0) {
        setIsLogin(true);
        setDataUser(userData[0]);
        localStorage.setItem("isLoginPokedex", true);
        localStorage.setItem("emailPokedex", data.email);
        localStorage.setItem("passwordPokedex", data.password);

        enqueueSnackbar("You have logged in successfully", { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar("Invalid username or password", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      console.error(error);
    }
  };

  return { tryLogin };
};

export default useLogin;
