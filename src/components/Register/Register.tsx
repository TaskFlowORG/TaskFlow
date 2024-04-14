'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { userService } from "@/services";
import { UserPost } from "@/models";
import { useTheme } from "next-themes";
import { ProgressBar } from "./ProgressBar";
import { useRouter } from 'next/navigation';
import { UserDetails } from "@/models/user/user/UserDetails";
import { signIn } from "next-auth/react";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nome deve conter no mínimo 3 caracteres" })
      .max(20, { message: "Nome deve conter no máximo 20 caracteres" }),
    surname: z
      .string()
      .min(3, { message: "Sobrenome deve conter no mínimo 3 caracteres" })
      .max(40, { message: "Sobrenome deve conter no máximo 40 caracteres" }),
    username: z
      .string()
      .min(3, { message: "Nome de usuário deve conter no mínimo 3 caracteres" })
      .max(20, {
        message: "Nome de usuário deve conter no máximo 20 caracteres",
      }),
    mail: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres.')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
      .regex(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial.'),
    confirmPassword: z
      .string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Senhas não coincidem.",
      path: ["confirmPassword"],
    }
  )

type FormData = z.infer<typeof schema>;

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
const{ register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
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

  const onSubmit = async (data: UserData) => {
    console.log(errors.mail?.message)
    console.log("A MULEKE")
    try {
      const { username, name, surname, password, mail } = data;
      await userService.insert(new UserPost(new UserDetails(username, password), name, surname, mail));
      signIn("credentials", { username, password, redirect: true, callbackUrl: `/${username}` });
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err.errors);
      }
    }
  }

  const iconUser = theme === "light" ? "/img/themeLight/IconUser.svg" : "/img/themeDark/userIcon.svg";
  const iconMail = theme === "light" ? "/img/themeLight/mail.svg" : "/img/themeDark/mail.svg";
  const iconPassword = theme === "light" ? "/img/themeLight/password.svg" : "/img/themeDark/password.svg";
  const color = theme === "light" ? "#F04A94" : "#F76858";

  return (
    <div className="flex h-5/6 w-screen absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
      <div className="flex items-center flex-col md:h-1/2 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4  shadow-blur-10 rounded-md bg-white dark:bg-modal-grey justify-between py-8">
        <div className="h-full w-4/5 flex flex-col items-center justify-between">
        <h4 className="h4 leading-6 flex py-2 md:py-0">Registar</h4>
        <ProgressBar step={step} color={color}/>
          {step === 0 && (
            <>
              <Input
                className="inputRegister"
                image={iconUser}
                placeholder="Digite seu nome"
                helperText={errors.name?.message}
                register={{...register("name")}}
                required
                classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey "}
              />
              <Input
                className="inputRegister"
                image={iconUser}
                placeholder="Digite seu sobrenome"
                helperText={errors.surname?.message}
                register={{ ...register("surname")}}
                required
                classNameInput={"w-5/6 h-10 md:h-full outline-none dark:bg-modal-grey"}
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
                register={{ ...register("username")}}
                required
                classNameInput={"w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"}
              />
              <Input
                className="inputRegister"
                image={iconMail}
                placeholder="Digite seu email"
                helperText={errors.mail?.message}
                register={{ ...register("mail")}}
                required
                classNameInput={"w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"}
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
                register={{ ...register("password")}}
                required
                classNameInput={"w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"}
              />
              <Input
                className="inputRegister"
                image={iconPassword}
                placeholder="Confirme sua senha"
                type="password"
                helperText={errors.confirmPassword?.message}
                register={{ ...register("confirmPassword")}}
                required
                classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}
              />
            </>
          )}


          <div className="flex justify-between w-full mt-4">
            {step === 0 && <span className="w-28 h-7"></span>}
            {step > 0 && (
              <button type="button" onClick={handlePrevStep} className="font-alata text-md rounded-lg w-28 h-10 bg-[#F04A94] dark:bg-[#F76858]  text-[#FCFCFC] ">
                Anterior
              </button>
            )}
            {step < 2 && (
              <button type="button" onClick={handleNextStep} className="font-alata text-md rounded-lg w-28 h-10 bg-[#F04A94] dark:bg-[#F76858] text-[#FCFCFC] ">
                Próximo
              </button>
            )}
            {step === 2 &&
            <button className="font-alata text-md rounded-lg w-28 h-10 bg-[#F04A94] dark:bg-[#F76858] text-[#FCFCFC] " onClick={() => onSubmit(getValues())} >
              Entrar
            </button>
}
          </div>
          <p className="mt-2 text-sm font-alata underline text-[#282828] dark:text-[#FCFCFC] hover:cursor-pointer hover:text-[#F04A94] dark:hover:text-[#F76858]" onClick={() => router.push("/login")}>
            Já possui uma conta?
          </p>
        </div>
      </div>
    </div>
  );
};