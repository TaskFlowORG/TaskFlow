"use client"
import  "./style.css";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Api } from "@/services/api";

import React from "react";
import { useForm } from "react-hook-form";
import { ZodError, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterShape } from "@/components/RegisterShape";
import { Input } from "@/components/Input";

const schema = z.object({
    name: z.string().min(3, { message: "Nome deve conter no minimo 3 caracteres" }).max(20, { message: "Nome deve conter no maximo 20 caracteres" }),
    surname: z.string().min(3, { message: "Sobrenome deve conter no minimo 3 caracteres" }).max(40, { message: "Sobrenome deve conter no maximo 40 caracteres" }),
    username: z.string().min(3, { message: "Nome de usuario deve conter no minimo 3 caracteres" }).max(20, { message: "Nome de usuario deve conter no maximo 20 caracteres" }),
    email: z.string().email({ message: "Email invalido" }),
    password: z.string().min(6, { message: "Senha deve conter no minimo 6 caracteres" }).max(20, { message: "Senha deve conter no maximo 20 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Senha deve conter no minimo 6 caracteres" }).max(20, { message: "Senha deve conter no maximo 20 caracteres" }),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Senha não coincide",
        path: ["confirmPassword"],
    }
);
type FormData = z.infer<typeof schema>
const page = () => {


    const { register, handleSubmit, getValues ,formState: { errors } } = useForm<FormData>({
        mode : 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema)
    });


    const api = new Api();
    const route = useRouter();
    const [value, setValue] = useState(0);
    const [user, setUser] = useState({} as FormData)


    const api = new Api();
    const route = useRouter();
    const [value, setValue] = useState(0);

              
    const handlebutton = () => {
        if (value >= 0 && value <= 2) {
            console.log(getValues())
            setValue(value + 1)
        }
    }

    const handlebuttonSub = () => {
        if (value >= 1 && value <= 2) {
            setValue(value - 1)
        }
    }

    const handleRegister = async (data: FormData) => {
        try {
            const result = schema.parse(data)
            api.post('/user', result)
            route.push('/login')
        } catch (err) {
            if (err instanceof ZodError) {
                console.log(err.flatten())
            }
        }
    };

    return (

        <div className="h-5/6 w-screen flex justify-center items-center">

            <RegisterShape />
            <div className={"h-[60%] w-[80%] 1.5xl:w-[30%] 2xl:w-1/4  md:w-[45%] sm:w-[80%]  shadow-blur-10 rounded-md flex justify-center items-center bg-white dark:bg-modal-grey "}>
                <form onSubmit={handleSubmit(handleRegister)} className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className="h4">Registrar</p>

                    {value === 0 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" value={user.name} helperText={errors.name?.message} register={{ ...register('name') }} required />
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu sobrenome" helperText={errors.surname?.message} register={{ ...register('surname') }} required />
                    </>}

                    {value === 1 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome de usuário" helperText={errors.username?.message} register={{ ...register('username') }} required />
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu email" helperText={errors.email?.message} register={{ ...register('email') }} required />
                    </>}

                    {value === 2 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} type="password" placeholder="Digite sua senha" helperText={errors.password?.message} register={{ ...register('password') }} required />
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Confirme sua senha" helperText={errors.confirmPassword?.message} register={{ ...register('confirmPassword') }} required />
                    </>}

                    <div className=" flex flex-row justify-end w-full">

                        {value > 0 &&
                            <div className="w-1/2 flex justify-start">
                                <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}
                                    onClick={handlebuttonSub}>Voltar</button>
                            </div>
                        }
                        {value == 2 &&
                            <div className="w-1/2">

                            </div>
                        }
                        {value >= 0 && value < 2
                            &&
                            <div className="w-1/2 flex justify-end">
                                <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}
                                    onClick={handlebutton}>Proximo</button>
                            </div>}
                        {value == 2 &&
                            <div className="w-1/2 flex justify-end">
                                <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}              
                                    type="submit" onClick={handleRegister}>Enviar</button>
                            </div>
                        }
                    </div>
                    <div className="w-[75%] flex justify-center">
                        <p className={'font-alata text-sm'}>Já possui uma conta?</p>
                        <p className="font-alata text-sm underline text-secondary hover:cursor-pointer hover:text-light-orange" onClick={() => {
                            route.push('/login')
                        }}>Entrar</p>
                    </div>
                </form>
            </div>
        </div>)
}
export default page;