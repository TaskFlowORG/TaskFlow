import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { userService } from "@/services";
import { UserPost } from "@/models";

const schema = z.object({
  name: z.string().min(3, { message: "Nome deve conter no mínimo 3 caracteres" }).max(20, { message: "Nome deve conter no máximo 20 caracteres" }),
  surname: z.string().min(3, { message: "Sobrenome deve conter no mínimo 3 caracteres" }).max(40, { message: "Sobrenome deve conter no máximo 40 caracteres" }),
  username: z.string().min(3, { message: "Nome de usuário deve conter no mínimo 3 caracteres" }).max(20, { message: "Nome de usuário deve conter no máximo 20 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve conter no mínimo 6 caracteres" }).max(20, { message: "Senha deve conter no máximo 20 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Senha deve conter no mínimo 6 caracteres" }).max(20, { message: "Senha deve conter no máximo 20 caracteres" }),
}).refine(
  values => values.password === values.confirmPassword,
  { message: "Senha não coincide", path: ["confirmPassword"] }
);
type FormData = z.infer<typeof schema>;

interface UserData {
  name: string;
  username: string;
  surname: string;
  email: string;
  password: string;
}

export const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    resolver: zodResolver(schema)
  });

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
      await userService.insert(new UserPost(data.username, data.name, data.surname, data.password));
      router.push("/login");
    } catch (err) {
      if (err instanceof ZodError) {
        console.error(err.errors);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col w-full max-w-md p-8 bg-white rounded-md shadow-md">
        {step === 0 && (
          <>
            <Input
              image={"/img/IconUser.svg"}
              placeholder="Digite seu nome"
              helperText={errors.name?.message}
              register={register("name")}
            />
            <Input
              image={"/img/IconUser.svg"}
              placeholder="Digite seu sobrenome"
              helperText={errors.surname?.message}
              register={register("surname")}
            />
          </>
        )}

        {step === 1 && (
          <>
            <Input
              image={"/img/IconUser.svg"}
              placeholder="Digite seu nome de usuário"
              helperText={errors.username?.message}
              register={register("username")}
            />
            <Input
              image={"/img/IconUser.svg"}
              placeholder="Digite seu email"
              helperText={errors.email?.message}
              register={register("email")}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Input
              image={"/img/IconUser.svg"}
              type="password"
              placeholder="Digite sua senha"
              helperText={errors.password?.message}
              register={register("password")}
            />
            <Input
              image={"/img/IconUser.svg"}
              placeholder="Confirme sua senha"
              helperText={errors.confirmPassword?.message}
              register={register("confirmPassword")}
            />
          </>
        )}

        <div className="flex justify-between w-full mt-4">
          {step > 0 && (
            <button type="button" onClick={handlePrevStep} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">
              Anterior
            </button>
          )}
          {step < 2 && (
            <button type="button" onClick={handleNextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
              Próximo
            </button>
          )}
          {step === 2 && (
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
              Enviar
                        </button>
                    )}
                </div>
                <p className="mt-2 text-sm">
                    Já possui uma conta? <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/login")}>Entrar</span>
                </p>
            </form>
        </div>
    );
};
