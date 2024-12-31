import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [dataUser, setDataUser] = useState(null);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, dataUser, setDataUser }}>{children}</LoginContext.Provider>
  );
}
