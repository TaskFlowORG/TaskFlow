"use client";
import React, { useState } from "react";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme } from "next-themes";
import { Transition } from "../Transition";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { TwoFactor } from "../TwoFactor";
import { authentication } from "@/services/services/Authentication";
import { ForgotPassword } from "../ForgotPassword";
import Image from "next/image";

export const Login = () => {
  const [user, setUser] = useState({} as FormData);
  const [loginError, setLoginError] = useState<string>("");
  const { t } = useTranslation();
  type FormData = z.infer<typeof schema>;
  const schema = z.object({
    username: z
      .string()
      .min(3, { message: t("username-min") })
      .max(20, {
        message: t("username-max"),
      }),
    password: z.string().min(6, { message: t("password-min") }),
  });

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
  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [usernameT, setUsernameT] = useState<string>("");
  const [passwordT, setPasswordT] = useState<string>("");

  const iconUser =
    theme === "light"
      ? "/img/themeLight/IconUser.svg"
      : "/img/themeDark/userIcon.svg";
  const iconPassword =
    theme === "light"
      ? "/img/themeLight/password.svg"
      : "/img/themeDark/password.svg";

  const login = async (data: FormData) => {
    setPasswordT(data.password.toString());
    setUsernameT(data.username.toString());
    await authentication
      .login({
        username: data.username,
        password: data.password,
      })
      .then(async (value) => {
        if (!value) return;
        else {
          route.push("/" + data.username);
        }
      })
      .catch((error) => {
        if (error.response.status == 403) {
          setForgotPassword(true);
        } else if (error.response.status == 406) {
          setTwoFactor(true);
        } else if (error.response.status == 401) {
          setLoginError(t("login-error"));
        }
      });
  };

  return (
    <>
      {forgotPassword ? (
        <div className="absolute w-full h-full z-50 left-[44.5%] top-[60%] -translate-x-1/2 -translate-y-1/2">
          <ForgotPassword setForgotPassword={setForgotPassword} />
        </div>
      ) : (
        ""
      )}
      <div className="flex h-full w-full absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
        <div className="h-full w-full shadow-blur-10 rounded-md pb-4 pt-2 bg-white dark:bg-modal-grey flex flex-col justify-center items-center">
          {!twoFactor ? (
            <>
              <h4 className="h4 leading-6 flex py-3 md:py-0">
                {t("access-account")}
              </h4>
              <form
                id="modalLogin"
                onSubmit={handleSubmit(login)}
                className="flex items-center flex-col h-[75%] w-full  justify-between pt-5 pb-1"
              >
                <span className="text-red-500 text-sm">{loginError ?? ""}</span>
                <div className="h-[95%] w-4/5 flex flex-col items-center justify-between">
                  <Input
                    className="inputRegister"
                    image={iconUser}
                    placeholder={t("type-username")}
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
                    placeholder={t("type-password")}
                    onChange={() => setLoginError("")}
                    value={user.password}
                    helperText={errors.password?.message}
                    register={{ ...register("password") }}
                    required
                    classNameInput={
                      "w-5/6  h-10 md:h-full outline-none px-5 dark:bg-modal-grey"
                    }
                  />
                  <div className=" w-full flex justify-between py-2">
                    <p
                      className={
                        "font-alata text-xs lg:text-sm underline hover:cursor-pointer hover:text-secondary "
                      }
                      onClick={() => setForgotPassword(true)}
                    >
                      {t("forgot-password")}
                    </p>
                    <Transition href="/register" label={t("register-login")} />
                  </div>
                  <button
                    className={
                      "bg-primary rounded-md h5 text-white hover:bg-light-pink w-full h-[40px] dark:bg-secondary dark:hover:bg-light-orange"
                    }
                    type="submit"
                  >
                    {t("access")}
                  </button>
                </div>
              </form>
              <div className="flex w-4/5 items-center gap-2 justify-between">
                <div className="h-[2px] bg-zinc-200 w-full flex-1"></div>
                <p className="text-mn font-montserrat text-zinc-400 py-1">Ou</p>
                <div className="h-[2px] bg-zinc-200 w-full flex-1"></div>
              </div>

              <div className="flex justify-between gap-4 w-4/5 ">
                <button
                  className="w-full justify-center font-alata dark:border-zinc-600 hover:border-zinc-600  border-2 flex-1 gap-2 h-[40px] bg-white text-black shadow-blur-10 rounded-md hover:bg-slate-200 flex items-center dark:bg-modal-grey dark:text-white dark:hover:bg-gray-500 dark:shadow-blur-20  "
                  onClick={() =>
                    route.push("http://localhost:9999/oauth2/authorization/github")
                  }
                >
                  {theme == "dark" ? (
                    <Image
                      width={16}
                      height={16}
                      src="/githubDark.svg"
                      alt="github"
                    />
                  ) : (
                    <Image
                      width={16}
                      height={16}
                      src="/github.svg"
                      alt="github"
                    />
                  )}
                  {"Github"}
                </button>
                <button
                  className="w-full dark:border-zinc-600 font-alata hover:border-zinc-600   border-2 justify-center flex-1 gap-2 h-[40px] bg-white text-black shadow-blur-10 rounded-md hover:bg-slate-200  flex items-center dark:bg-modal-grey dark:text-white dark:hover:bg-gray-500 dark:shadow-blur-20  "
                  onClick={() =>
                    route.push("http://localhost:9999/oauth2/authorization/google")
                  }
                >
                  {theme == "dark" ? (
                    <Image
                      width={16}
                      height={16}
                      src="/googleDark.svg"
                      alt="github"
                    />
                  ) : (
                    <Image
                      width={16}
                      height={16}
                      src="/google.svg"
                      alt="github"
                    />
                  )}
                  {"Google"}
                </button>
              </div>
              {/* <button
                  className="w-[200px] h-[40px] bg-white text-black shadow-blur-10 rounded-md hover:bg-slate-200 flex items-center dark:bg-modal-grey dark:text-white dark:hover:bg-gray-500 dark:shadow-blur-20  "
                  onClick={() =>
                    route.push("http://localhost:9999/auth/login/code/github")
                  }
                >
                  {theme == "dark" ? <Image width={24} height={24} src="/Assets/GitHub.svg" alt="github" /> : <Image width={24} height={24} src="/Assets/GitHubDark.svg" alt="github" />}
                  {t("login-github")}
                </button> */}
            </>
          ) : (
            <TwoFactor password={passwordT} username={usernameT} />
          )}
        </div>
      </div>
    </>
  );
};