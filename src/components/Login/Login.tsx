"use client";
import React, { use, useState } from "react";
import { Input } from "@/components/Input";
import { set, useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { Transition } from "../Transition";
import { Dictophone } from "../Dictophone";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
  const [loginError, setLoginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    getValues,
    setError,
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

  const login = async (data: FormData) => {
    console.log(data);
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    }).then((value) => {
      console.log(value);

      if (!value || value.error?.includes("401")) {
        setLoginError("Usuário ou senha incorretos");
      } else if (value.error?.includes("403")) {
        route.push("/forgotPassword");
      } else {
        route.push("/" + data.username);
      }
    });
  };

  return (
    <>
      <div className="flex h-full w-full absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
        <div className="h-full w-full shadow-blur-10 rounded-md bg-white dark:bg-modal-grey flex flex-col justify-center items-center">
        <h4 className="h4 leading-6 flex py-3 md:py-0">Acesse sua conta</h4>
          <form
            id="modalLogin"
            onSubmit={handleSubmit(login)}
            className="flex items-center flex-col h-4/5 w-full  justify-between py-5"
          >
        
            <span className="text-red-500 text-sm">{loginError ?? ""}</span>

            <div className="h-[95%] w-4/5 flex flex-col items-center justify-between">
              <Input
                className="inputRegister"
                image={iconUser}
                placeholder="Digite seu nome"
                value={user.username}
                helperText={errors.username?.message}
                register={{ ...register("username") }}
                required
                onChange={() => setLoginError("")}
                classNameInput={
                  "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
                }
              />

              <Input
                className="inputRegister"
                image={iconPassword}
                type="password"
                placeholder="Digite sua senha"
                onChange={() => setLoginError("")}
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
                  onClick={() => route.push("/forgotPassword")}
                >
                  Esqueceu sua senha?
                </p>
                <Transition href="/register" label="Registre-se!" />
              </div>

              <button
                className={
                  "bg-primary rounded-md h5 text-white hover:bg-light-pink w-[200px] h-[40px] dark:bg-secondary dark:hover:bg-light-orange"
                }
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>

          <button
          className="w-[200px] h-[40px] bg-black text-white rounded-md hover:bg-gray-800 flex  items-center"
            onClick={() =>
              route.push("http://localhost:9999/auth/login/code/github")
            }
          ><img src="/Assets/GitHub.svg" alt="" />
          Login com o GitHub
          </button>
        </div>
      </div>
    </>
  );
};
