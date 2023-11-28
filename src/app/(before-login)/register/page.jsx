
"use client"
import { RegisterShape } from "@/components/RegisterShape";
import { useRouter } from "next/navigation";
import { useState } from "react";



const schema = z.object({
    name: z.string().min(3, 'Nome muito curto').max(50, 'Nome muito longo'),
    surname: z.string().min(3, 'Sobrenome muito curto').max(50, 'Sobrenome muito longo'),
    username: z.string().min(3, 'Nome de usuário muito curto').max(50, 'Nome de usuário muito longo'),
    password: z.string().min(3, 'Senha muito curta').max(50, 'Senha muito longa'),
    email: z.string().email('Email inválido')
});
const page = () => {
    const api = new Api();
   
    const theme = 'light';


    const [user, setUser] = useState({});
    const theme = 'light';
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
            <div className={"h-[60%] w-[25%] shadow-blur-10 rounded-md flex justify-center items-center " + (theme == "dark" ? " bg-modal-grey" : "bg-white")}>
                <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className={(theme == "dark" && " h4 text-white") + (theme == "light" && " h4")}>Registrar</p>

                    {value == 0 && <>
                        <div className="inputLight ">
                            <img src="Assets/themelight/IconUser.svg" alt="" className="w-8 h-full" />
                            <input type="text" className="w-5/6 h-full outline-none px-5 rounded-md" placeholder="Digite o seu nome " valeu={user.name}
                                onChange={
                                    (e) => {
                                        setUser({ ...user, name: e.target.value })
                                    }
                                } />
                        </div>

                        <div className="inputLight">
                            <img src="Assets/themelight/IconUser.svg" alt="" className="w-8 h-full" />
                            <input type="text" className="w-5/6 h-full outline-none  px-5" placeholder="Digite o seu sobrenome " value={user.surname}
                                onChange={
                                    (e) => {
                                        setUser({ ...user, surname: e.target.value })
                                    }
                                } />
                        </div>
                    </>
                    }

                    {value == 1 && <>
                        <div className="inputLight ">
                            <img src="Assets/themelight/IconUser.svg" alt="" className="w-8 h-full" />
                            <input type="text" className="w-5/6 h-full outline-none px-5 rounded-md" placeholder="Digite o nome de Usuário " value={user.username}
                                onChange={
                                    (e) => {
                                        setUser({ ...user, username: e.target.value })
                                    }
                                } />
                        </div>

                        <div className="inputLight">
                            <img src="Assets/themelight/IconUser.svg" alt="" className="w-8 h-full" />
                            <input type="text" className="w-5/6 h-full outline-none  px-5" placeholder="Digite seu email " value={user.email}
                                onChange={
                                    (e) => {
                                        setUser({ ...user, email: e.target.value })
                                    }
                                } />
                        </div>
                    </>}
                    {value == 2 && <>
                        <div className="inputLight ">
                            <img src="Assets/themelight/IconUser.svg" alt="" className="w-8 h-full" />
                            <input type="text" className="w-5/6 h-full outline-none px-5 rounded-md" placeholder="Digite sua senha" value={user.password}
                                onChange={
                                    (e) => {
                                        setUser({ ...user, password: e.target.value })
                                    }
                                }
                            />
                        </div>

                        <div className="inputLight">
                            <img src="Assets/themelight/IconUser.svg" alt="" className="w-8 h-full" />
                            <input type="text" className="w-5/6 h-full outline-none  px-5" placeholder="Confirme sua senha " />
                        </div>
                    </>}

                    <div className=" flex flex-row justify-end w-full">

                        {value > 0 &&
                            <div className="w-1/2 flex justify-start">
                                <button className={theme == "dark" ? "buttonDark w-[150px] h-[44px]" : "buttonLight w-[150px] h-[44px]"}
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
                                <button className={theme == "dark" ? "buttonDark  w-[150px] h-[44px] justify-end" : "buttonLight w-[150px] h-[44px] justify-end"}
                                    onClick={handlebutton}>Proximo</button>
                            </div>}

                        {value == 2 &&
                            <div className="w-1/2 flex justify-end">
                                <button className={theme == "dark" ? "buttonDark  w-[150px] h-[44px] justify-end" : "buttonLight w-[150px] h-[44px] justify-end"}
                                    onClick={register}>Enviar</button>
                            </div>
                        }

                    </div>
                    <div className="w-[75%] flex justify-center">

                        <p className={'font-alata text-sm ' + (theme == "dark" && " text-white")}>Já possui uma conta?</p>
                        <p className="font-alata text-sm underline text-secondary hover:cursor-pointer hover:text-light-orange" onClick={() => {
                            route.push('/login')
                        }}>Entrar</p>
                    </div>

                </div>
            </form>


        </div>)

}

export default page;