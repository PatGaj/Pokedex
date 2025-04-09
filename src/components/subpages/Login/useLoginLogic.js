import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "hooks";

export const useLoginLogic = () => {
  const schema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "The password cannot be blank"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { tryLogin } = useLogin();

  const handleLogin = (data) => {
    tryLogin(data);
  };

  return { register, handleSubmit, errors, handleLogin };
};
