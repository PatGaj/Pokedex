import { useContext, useEffect } from "react";
import useLogin from "./hooks/useLogin";
import { LoginContext } from "context/index";

const useAppLogic = () => {
  const { isLogin } = useContext(LoginContext);
  const { tryLogin } = useLogin();
  const localIsLogin = localStorage.getItem("isLoginPokedex");

  useEffect(() => {
    if (!isLogin && localIsLogin) {
      const email = localStorage.getItem("emailPokedex");
      const password = localStorage.getItem("passwordPokedex");
      tryLogin({ email, password });
    }
  }, [tryLogin, isLogin]);
};
export default useAppLogic;
