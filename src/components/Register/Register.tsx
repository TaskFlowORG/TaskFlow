
'use client'
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { userService } from "@/services";
import { UserPost } from "@/models";
import { useTheme } from "next-themes";

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
      .min(8, { message: "Senha deve conter no mínimo 6 caracteres" })
      .max(20, { message: "Senha deve conter no máximo 20 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Senha deve conter no minimo 6 caracteres" })
      .max(20, { message: "Senha deve conter no maximo 20 caracteres" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Senha não coincide",
      path: ["confirmPassword"],
    }
  );


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
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    resolver: zodResolver(schema)
  });
  const [user, setUser] = useState({} as FormData);
  const { theme, setTheme } = useTheme();



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
    try {
      const { username, name, surname, password, mail } = data;
      await userService.insert(new UserPost(username, name, surname, password, mail));
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err.errors);
      }
    }
  }



  const imageUser = theme === "light" ? "/img/themeLight/IconUser.svg" : "/img/themeDark/userIcon.svg";

  return (
    <div className="flex h-5/6 w-screen absolute justify-center items-center  text-[#333] dark:text-[#FCFCFC]">
      <div className="flex items-center flex-col md:h-1/2 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey  justify-between py-8">
        <h4 className="h4 py-3 md:py-0">Registar</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="h-4/5 w-4/5 flex flex-col items-center justify-between">
          {step === 0 && (
            <>
              <Input
                className="inputRegister"
                image={imageUser}
                placeholder="Digite seu nome"
                value={user.name}
                helperText={errors.name?.message}
                register={{ ...register("name") }}
                required
                classNameInput={"w-5/6 h-full outline-none px-5 dark:bg-modal-grey "}
              />
              {console.log()}
              <Input
                className="inputRegister"
                image={imageUser}
                placeholder="Digite seu sobrenome"
                value={user.surname}
                helperText={errors.surname?.message}
                register={{ ...register("surname") }}
                required
                classNameInput={"w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"}
              />
            </>
          )}


          {step === 1 && (
            <>
              <Input
                className="inputRegister"
                image={imageUser}
                placeholder="Digite seu nome de usuário"
                helperText={errors.username?.message}
                value={user.username}
                register={{ ...register("username") }}
                required
                classNameInput={"w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"}
              />
              <Input
                className="inputRegister"
                image={"/img/themelight/mail.svg"}
                placeholder="Digite seu email"
                value={user.mail}
                helperText={errors.mail?.message}
                register={{ ...register("mail") }}
                required
                classNameInput={"w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"}
              />
            </>
          )}


          {step === 2 && (
            <>
              <Input
                className="inputRegister"
                image={"/img/themelight/password.svg"}
                type="password"
                placeholder="Digite sua senha"
                helperText={errors.password?.message}
                register={{ ...register("password") }}
                required
                classNameInput={"w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"}
              />
              <Input
                className="inputRegister"
                image={"/img/themelight/password.svg"}
                placeholder="Confirme sua senha"
                helperText={errors.confirmPassword?.message}
                register={{ ...register("confirmPassword") }}
                required
                classNameInput={"w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"}
              />
            </>
          )}


          <div className="flex justify-between w-full mt-4">
            {step > 0 && (
              <button type="button" onClick={handlePrevStep} className="font-alata text-sm underline text-[#282828] hover:cursor-pointer hover:text-[#F04A94]">
                Anterior
              </button>
            )}
            {step < 2 && (
              <button type="button" onClick={handleNextStep} className="font-alata text-sm underline text-[#282828] hover:cursor-pointer hover:text-[#F04A94]">
                Próximo
              </button>
            )}
            {step === 2 && (
              <button type="submit" className="font-alata text-sm underline text-secondary hover:cursor-pointer hover:text-light-orange">
                Enviar
              </button>
            )}
          </div>
          <p className="mt-2 text-sm font-alata underline text-[#282828] hover:cursor-pointer hover:text-light-orange">
            Já possui uma conta?
          </p>
        </form>
      </div>


    </div>
  );
};




