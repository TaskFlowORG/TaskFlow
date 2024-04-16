
"use client";
import { LoginShape } from '@/components/LoginShape';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
const schema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Nome de usuario deve conter no minimo 3 caracteres" })
            .max(20, {
                message: "Nome de usuario deve conter no maximo 20 caracteres",
            }),
        password: z
            .string()
            .min(6, { message: "Senha deve conter no minimo 6 caracteres" })
            .max(20, { message: "Senha deve conter no maximo 20 caracteres" }),
    })
    
type FormData = z.infer<typeof schema>;



   
    const Page = () => {


        
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

        return (
            <>
                <div className="h-[85%] w-screen flex justify-center items-center">
                    <LoginShape />

                    <div className={"h-[55%] w-1/4 shadow-blur-10 dark:shadow-blur-20 rounded-md flex justify-center items-center bg-white dark:bg-modal-grey"}>
                        <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                            <p className={"h4 "}>Acesse sua conta</p>

                            <Input className="inputRegister"
                                image={"Assets/themelight/IconUser.svg"}
                                placeholder="Digite seu nome"
                                value={user.username}
                                helperText={errors.username?.message}
                                register={{ ...register("username") }}
                                required classNameInput={"w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"} />

                            <Input className="inputRegister"
                                image={"Assets/themelight/IconUser.svg"}
                                placeholder="Digite sua senha"
                                value={user.password}
                                helperText={errors.password?.message}
                                register={{ ...register("password") }}
                                required classNameInput={"w-5/6 h-full outline-none  px-5 dark:bg-modal-grey"} />

                            <div className="w-4/6 flex justify-between">
                                <p className={'font-alata text-sm underline hover:cursor-pointer hover:text-secondary '}>Esqueceu sua senha?</p>
                                <p className={'font-alata text-sm underline hover:cursor-pointer hover:text-secondary '} onClick={() => route.push("/register")}>Registre-se!</p>
                            </div>

                            <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}
                            onClick={() =>signIn(
                                "credentials",{
                                    username: getValues("username"),
                                    password:   getValues("password"),
                                    redirect: true,
                                    callbackUrl: `/${getValues("username")}` 
                                    
                                }
                            
                            )}
                            >Enviar</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
 

    export default Page;
