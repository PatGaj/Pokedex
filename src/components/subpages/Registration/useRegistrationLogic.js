import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "hooks";
import { z } from "zod";

export const useRegistrationLogic = () => {
  const validationSchema = z
    .object({
      username: z.string().min(3, "Username must be at least 3 characters long"),
      email: z.string().email("Invalid email format"),
      password: z
        .string()
        .min(8, "The password must have at least 8 characters")
        .regex(/[A-Z]/, "The password must contain at least 1 capital letter")
        .regex(/\d/, "The password must contain at least 1 digit")
        .regex(/[@$!%*?&]/, "The password must contain at least 1 special character (@$!%*?&))"),
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { createUser } = useRegister();

  const handleRegister = (data) => {
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      used_sprites: [],
      pokemons: [],
    };
    createUser(newUser);
  };

  return { register, handleSubmit, errors, handleRegister };
};
