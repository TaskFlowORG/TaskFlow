"use client"

import { useRouter } from "next/navigation";
<<<<<<< HEAD:src/app/(before-login)/register/page.tsx
import { useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> main:src/app/(all)/(before-login)/register/page.tsx
import {Api} from "@/services/api";
import React from "react";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { RegisterShape } from "@/components/RegisterShape";
import { Input } from "@/components/Input";

const schema = z.object({
    name: z.string().min(3, { message: "Nome deve conter no minimo 3 caracteres" }).max(20, { message: "Nome deve conter no maximo 20 caracteres" }),
    surname: z.string().min(3, { message: "Sobrenome deve conter no minimo 3 caracteres" }).max(20, { message: "Sobrenome deve conter no maximo 20 caracteres" }),
    username: z.string().min(3, { message: "Nome de usuario deve conter no minimo 3 caracteres" }).max(20, { message: "Nome de usuario deve conter no maximo 20 caracteres" }),
    email: z.string().email({ message: "Email invalido" }),
    password: z.string().min(6, { message: "Senha deve conter no minimo 6 caracteres" }).max(20, { message: "Senha deve conter no maximo 20 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Senha deve conter no minimo 6 caracteres" }).max(20, { message: "Senha deve conter no maximo 20 caracteres" }),
});
type FormData = z.infer<typeof schema>

const page = () => {

<<<<<<< HEAD:src/app/(before-login)/register/page.tsx
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        
        resolver: zodResolver(schema)
    });

=======
    const { register, handleSubmit, getValues ,formState: { errors } } = useForm<FormData>({
        mode : 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema)
    });

    console.log(errors)
>>>>>>> main:src/app/(all)/(before-login)/register/page.tsx

    const api = new Api();
    const route = useRouter();
    const [value, setValue] = useState(0);
 
<<<<<<< HEAD:src/app/(before-login)/register/page.tsx

=======
>>>>>>> main:src/app/(all)/(before-login)/register/page.tsx
    const handlebutton = () => {
        if (value >= 0 && value <= 2) {
            setValue(value + 1)
        }
    }

    const handlebuttonSub = () => {
        if (value >= 1 && value <= 2) {
            setValue(value - 1)
        }
    }

    const handleRegister = async () => {
        try {
            const response = await api.post("/user",);
            console.log(response.data);
            route.push("/login");
        } catch (error) {
            console.log(error);
        }
    };
<<<<<<< HEAD:src/app/(before-login)/register/page.tsx


=======
        console.log(getValues('name'))
>>>>>>> main:src/app/(all)/(before-login)/register/page.tsx
    return (

        <div className="h-5/6 w-screen flex justify-center items-center">

            <RegisterShape />
            <div className={"h-[60%] w-[25%] shadow-blur-10 rounded-md flex justify-center items-center bg-white dark:bg-modal-grey "}>
<<<<<<< HEAD:src/app/(before-login)/register/page.tsx
                <form className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className="h4">Registrar</p>

                    {value == 0 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" helperText="Digite um nome válido" {...register('name') } required/>   
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu sobrenome" helperText="Digite um sobrenome válido" {...register('surname') } required/>   
                    </>
                    }
                    {value == 1 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome de usuário" helperText="Digite um nomde de usuário válido" {...register('username') } required/>   
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu email" helperText="Digite um email válido" {...register('email') } required/>   
                    </>}
                    {value == 2 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} type="password" placeholder="Digite sua senha" helperText="Digite uma senha válida" {...register('password') } required/>   
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Confirme sua senha" helperText="Senha Incorreta" {...register('confirmPassword') } required/>   
=======
                <form onSubmit={
                    handleSubmit(handleRegister)
                 } className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className="h4">Registrar</p>

                    {value == 0 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" helperText={errors.name?.message}  value={ getValues('name')}    {...register('name') } required/>   
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu sobrenome" {...register('surname') } helperText={errors.surname?.message} required/>   
                    </>
                    }
                    {value == 1 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome de usuário"  helperText={errors.username?.message} {...register('username') } required/>   
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu email"  helperText={errors.email?.message} {...register('email') } required/>   
                    </>}
                    {value == 2 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} type="password" placeholder="Digite sua senha"  helperText={errors.password?.message} {...register('password') } required/>   
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Confirme sua senha"  helperText={errors.confirmPassword?.message} {...register('confirmPassword') } required/>   
>>>>>>> main:src/app/(all)/(before-login)/register/page.tsx
                    </>}

                    <div className=" flex flex-row justify-end w-full">

                        {value > 0 &&
                            <div className="w-1/2 flex justify-start">
                                <button className={ "bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}
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
                                <button className={ "bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}
                                    onClick={handlebutton}>Proximo</button>
                            </div>}
                        {value == 2 &&
                            <div className="w-1/2 flex justify-end">
                                <button className={ "bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}
<<<<<<< HEAD:src/app/(before-login)/register/page.tsx
                                    type="submit" onClick={handleRegister}>Enviar</button>
=======
                                    type="submit">Enviar</button>
>>>>>>> main:src/app/(all)/(before-login)/register/page.tsx
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