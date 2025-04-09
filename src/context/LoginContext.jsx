import { enqueueSnackbar } from "notistack";
import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [dataUser, setDataUser] = useState(null);

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("emailPokedex");
    localStorage.removeItem("passwordPokedex");
    localStorage.removeItem("isLoginPokedex");
    setDataUser([]);
    enqueueSnackbar("Successfully logged out", { variant: "success" });
  };

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, dataUser, setDataUser, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
