"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import {Transition} from "../Transition";

const schema = z.object({
  username: z.string().min(3, { message: "No minimo 3 caracteres" }).max(20, {
    message: "No maximo 20 caracteres",
  }),
  password: z
    .string()
    .min(6, { message: "Senha deve conter no minimo 6 caracteres" })
    .max(20, { message: "Senha deve conter no maximo 20 caracteres" }),
});

type FormData = z.infer<typeof schema>;

export const Login = () => {
  const [user, setUser] = useState({} as FormData);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });
  const route = useRouter();
  const { theme } = useTheme();

  const iconUser =
    theme === "light"
      ? "/img/themeLight/IconUser.svg"
      : "/img/themeDark/userIcon.svg";
  const iconPassword =
    theme === "light"
      ? "/img/themeLight/password.svg"
      : "/img/themeDark/password.svg";

  return (
    <>
      <div className="flex h-5/6 w-screen absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
        <div id="modalRegisterLogin" className="opacity-0 flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey  justify-between py-8">
          <h4 className="h4 leading-6 flex py-3 md:py-0">Acesse sua conta</h4>

          <div className="h-4/5 w-4/5 flex flex-col items-center justify-between">
            <Input
              className="inputRegister"
              image={iconUser}
              placeholder="Digite seu nome"
              value={user.username}
              helperText={errors.username?.message}
              register={{ ...register("username") }}
              required
              classNameInput={
                "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
              }
            />

            <Input
              className="inputRegister"
              image={iconPassword}
              placeholder="Digite sua senha"
              value={user.password}
              helperText={errors.password?.message}
              register={{ ...register("password") }}
              required
              classNameInput={
                "w-5/6  h-10 md:h-full outline-none px-5 dark:bg-modal-grey"
              }
            />

            <div className="w-4/5 md:w-4/6 flex justify-between py-2">
              <p
                className={
                  "font-alata text-xs lg:text-sm underline hover:cursor-pointer hover:text-secondary "
                }
              >
                Esqueceu sua senha?
              </p>
              <Transition href="/register" label="Registre-se!" />
            </div>

            <button
              className={
                "bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"
              }
              onClick={() =>
                signIn("credentials", {
                  username: getValues("username"),
                  password: getValues("password"),
                  redirect: true,
                  callbackUrl: `/${getValues("username")}`,
                })
              }
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
