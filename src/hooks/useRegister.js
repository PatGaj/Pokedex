import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const useRegister = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const checkUserExists = async (email) => {
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
  };

  const createUser = async (newUser) => {
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
  };

  return { checkUserExists, createUser };
};

export default useRegister;
