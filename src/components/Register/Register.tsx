"use client";
import React, { FormEvent, use, useEffect, useState } from "react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { z, ZodError, ZodErrorMap, ZodIssue, ZodIssueCode } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { userService } from "@/services";
import { UserPost } from "@/models";
import { useTheme } from "next-themes";
import { ProgressBar } from "./ProgressBar";
import { useRouter } from "next/navigation";
import { UserDetails } from "@/models/user/user/UserDetails";
import { signIn } from "next-auth/react";
import { subscribe } from "diagnostics_channel";
import { useTranslation } from "next-i18next";
import { Transition } from "../Transition";

interface UserData {
  name: string;
  username: string;
  surname: string;
  mail: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const [step, setStep] = useState(0);
  const { t } = useTranslation();
  const [user] = useState({} as FormData);

  const schema = z
    .object({
      name: z
        .string()
        .min(3, { message: t("register-name-min") })
        .max(20, { message: t("register-name-max-characters") }),
      surname: z
        .string()
        .min(3, { message: t("register-surname-min-characters") })
        .max(40, { message: t("register-surname-max-characters") }),
      username: z
        .string()
        .min(3, { message: t("username-min") })
        .max(20, { message: t("username-max") }),
      mail: z.string().email({ message: t("email-invalid") }),
      password: z
        .string()
        .min(8, t("password-min"))
        .regex(/[a-z]/, t("password-lowercase"))
        .regex(/[A-Z]/, t("password-uppercase"))
        .regex(/[0-9]/, t("password-number"))
        .regex(/[^a-zA-Z0-9]/, t("password-special")),
      confirmPassword: z.string(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: t("password-match"),
        path: ["confirmPassword"],
      }
    );
  type FormData = z.infer<typeof schema>;


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

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const onSubmit = async (data: FormData) => {
      const { username, name, surname, password, mail } = data;
      console.log("data", data)
      await userService.insert(
        new UserPost(new UserDetails(username, password), name, surname, mail)
      ).then(() => {
        signIn("credentials", {
        username,
        password,
        redirect: true,
        callbackUrl: `/${username}`,
      });
      }).catch((error) => {
        if(error.response.status == 409){
          setError("username", {
            message: t("username-exists"),
            type: "manual",
          });
          setStep(1)
        }
      });
  };


  const verifyStep = () => {
    errors.confirmPassword && setStep(2)
    errors.password && setStep(2)
    errors.mail && setStep(1)
    errors.username && setStep(1) 
    errors.name && setStep(0)
    errors.surname && setStep(0)
  };

  const iconUser =
    theme === "light"
      ? "/img/themeLight/IconUser.svg"
      : "/img/themeDark/userIcon.svg";
  const iconMail =
    theme === "light" ? "/img/themeLight/mail.svg" : "/img/themeDark/mail.svg";
  const iconPassword =
    theme === "light"
      ? "/img/themeLight/password.svg"
      : "/img/themeDark/password.svg";
  const color = theme === "light" ? "#F04A94" : "#F76858";

  return (
    <div className="flex h-full w-full  absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
      <form
        onSubmit={handleSubmit(onSubmit, verifyStep)}
        id="modalRegister"
        className="flex h-full items-center flex-col w-full shadow-blur-10 rounded-md bg-white dark:bg-modal-grey  justify-between py-8"
      >
        <h4 className="h4 leading-6 flex py-2 md:py-0 mb-2">{t("register")}</h4>
        <ProgressBar step={step} color={color} /> 
        <div className="h-4/5 w-4/5 flex flex-col mt-6 items-center justify-between py-2 md:py-0">

          {step === 0 && (
            <>
              <Input
                className="inputRegister"
                image={iconUser}
                placeholder="Digite seu nome"
                helperText={errors.name?.message}
                register={{ ...register("name") }}
                required
                classNameInput={
                  "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
                }

              />
              <Input
                className="inputRegister"
                image={iconUser}
                placeholder="Digite seu sobrenome"
                helperText={errors.surname?.message}
                register={{ ...register("surname") }}
                required
                classNameInput={
                  "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
                }

              />
            </>
          )}

          {step === 1 && (
            <>
              <Input
                className="inputRegister"
                image={iconUser}
                placeholder="Digite seu nome de usuário"
                helperText={errors.username?.message}
                register={{ ...register("username") }}
                required
                classNameInput={
                  "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
                }
              />
              <Input
                className="inputRegister"
                image={iconMail}
                placeholder="Digite seu email"
                helperText={errors.mail?.message}
                register={{ ...register("mail") }}
                required
                classNameInput={
                  "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
                }
              />
            </>
          )}

          {step === 2 && (
            <>
              <Input
                className="inputRegister"
                image={iconPassword}
                type="password"
                placeholder="Digite sua senha"
                helperText={errors.password?.message}
                register={{ ...register("password") }}
                required
                classNameInput={
                  "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
                }
              />
              <Input
                className="inputRegister"
                image={iconPassword}
                placeholder="Confirme sua senha"
                type="password"
                helperText={errors.confirmPassword?.message}
                register={{ ...register("confirmPassword") }}
                required
                classNameInput={
                  "w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"
                }
              />
            </>
          )}
        </div>
        <div className="flex justify-between w-5/6 mt-4">
          {step === 0 && <span className="w-28 h-7"></span>}
          {step > 0 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="font-alata text-h5  rounded-lg w-28  bg-[#F04A94]  h-[44px] dark:bg-[#F76858]  text-[#FCFCFC] "
            >
              {t("back")}
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="font-alata text-h5  rounded-lg w-28  bg-[#F04A94]  h-[44px] dark:bg-[#F76858] text-[#FCFCFC] "
            >
              {t("next")}
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="font-alata text-h5  rounded-lg w-28  bg-[#F04A94]  h-[44px] dark:bg-[#F76858] text-[#FCFCFC]"
            >
              {t("register")}
            </button>
          )}
        </div>
        <Transition label={t("already-have-account")} href="/login" />
      </form>

    </div>
  );
};
