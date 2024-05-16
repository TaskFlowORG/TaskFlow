"use client";
import React, {  useState } from "react";
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

export const Login = () => {
  const [user, setUser] = useState({} as FormData);
  const [loginError, setLoginError] = useState<string>("");
  const { t } = useTranslation();
  type FormData = z.infer<typeof schema>;
  const schema = z.object({
    username: z.string().min(3, { message: t("username-min") }).max(20, {
      message: t("username-max")
    }),
    password: z
      .string()
      .min(6, { message: t("password-min") })
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
  const [twoFactor, setTwoFactor] = useState<number>(0);
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
    console.log(data);
    setPasswordT(data.password.toString());
    setUsernameT(data.username.toString());
    await authentication.login({
      username: data.username,
      password: data.password}).then(async (value) => {
      if (!value) return;
     else {
        route.push("/" + data.username);
      }
    }).catch((error) => {
      console.log(error);
      
      if (error.response.status== 403) {
        route.push("/forgotPassword");
      } else if (error.response.status == 406) {
        console.log('two factor');
        setTwoFactor(1)
      } else if (error.response.status == 401) {
        setLoginError(t("login-error"));
      }
    });
  };


  return (
    <>
      <div className="flex h-full w-full absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
        <div className="h-full w-full shadow-blur-10 rounded-md bg-white dark:bg-modal-grey flex flex-col justify-center items-center">
          {
            twoFactor === 0 ? (
              <>
                <h4 className="h4 leading-6 flex py-3 md:py-0">{t("access-account")}</h4>
                <form
                  id="modalLogin"
                  onSubmit={handleSubmit(login)}
                  className="flex items-center flex-col h-[75%] w-full  justify-between py-5"
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
                      
                      type={"password"}
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

                    <div className="w-4/5 md:w-4/6 flex justify-between py-2">
                      <p
                        className={
                          "font-alata text-xs lg:text-sm underline hover:cursor-pointer hover:text-secondary "
                        }
                        onClick={() => route.push("/forgotPassword")}
                      >
                        {t("forgot-password")}
                      </p>
                      <Transition href="/register" label={t("register-login")} />
                    </div>

                    <button
                      className={
                        "bg-primary rounded-md h5 text-white hover:bg-light-pink w-[200px] h-[40px] dark:bg-secondary dark:hover:bg-light-orange"
                      }
                      type="submit"
                    >
                      {t("access")}
                    </button>
                  </div>
                </form>

                <button
                  className="w-[200px] h-[40px] bg-white text-black shadow-blur-10 rounded-md hover:bg-slate-200 flex items-center dark:bg-modal-grey dark:text-white dark:hover:bg-gray-500 dark:shadow-blur-20  "
                  onClick={() =>
                    route.push("http://localhost:9999/auth/login/code/github")
                  }
                >{theme == "dark" ? <img src="/Assets/GitHub.svg" alt="" /> :
                  <img src="/Assets/GitHubDark.svg" alt="" />
                  }
                  Login com o GitHub
                </button>
              </>

            ) : (
              <TwoFactor password={passwordT} username={usernameT}/>
            )
          }
        </div>
      </div>
    </>
  );
};


