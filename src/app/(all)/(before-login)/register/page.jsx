"use client"
import { RegisterShape } from "@/components/RegisterShape";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/Input"
const page = () => {

    const [user, setUser] = useState({});
    const theme = 'light-'
    const route = useRouter();
    const [value, setValue] = useState(0);
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

    const register = () => {
        console.log(user)
    }

    return (

        <div className="h-5/6 w-screen flex justify-center items-center">

            <RegisterShape />
            <div className={"h-[60%] w-[25%] shadow-blur-10 rounded-md flex justify-center items-center bg-white dark:bg-modal-grey "}>
                <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className="h4">Registrar</p>

                    {value == 0 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" value={user.name} change={
                            (e) => {
                                setUser({ ...user, name: e.target.value })
                            }
                        } />

                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu sobrenome" value={user.surname} change={
                            (e) => {
                                setUser({ ...user, surname: e.target.value })
                            }
                        } />
                    </>
                    }

                    {value == 1 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" value={user.username} change={
                            (e) => {
                                setUser({ ...user, username: e.target.value })
                            }
                        } />

                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" value={user.email} change={
                            (e) => {
                                setUser({ ...user, email: e.target.value })
                            }
                        } />
                    </>}
                    {value == 2 && <>
                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" value={user.password} change={
                            (e) => {
                                setUser({ ...user, password: e.target.value })
                            }
                        } />

                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" value={user.email} change={
                            (e) => {
                                setUser({ ...user, email: e.target.value })
                            }
                        } />
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
                                    onClick={register}>Enviar</button>
                            </div>
                        }

                    </div>
                    <div className="w-[75%] flex justify-center">

                        <p className={'font-alata text-sm'}>Já possui uma conta?</p>
                        <p className="font-alata text-sm underline text-secondary hover:cursor-pointer hover:text-light-orange" onClick={() => {
                            route.push('/login')
                        }}>Entrar</p>
                    </div>

                </div>

            </div>

        </div>)

}

export default page;