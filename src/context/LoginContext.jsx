import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
}
