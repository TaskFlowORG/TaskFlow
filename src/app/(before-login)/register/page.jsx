'use client'
import { RegisterShape } from "@/components/RegisterShape";
import { useEffect, useState } from "react";
import {Api} from '@/services/api'
const page = () => {
    const api = new Api();
    const [user, setUser] = useState({})
    const theme = 'light'

    useEffect(() => {
        console.log(user)
    }
        , [user])

        const post = async () => {
            const response = await api.post("user",user);
            console.log(response)
        }


    return (
        <div className="h-[90%] w-screen flex justify-center items-center">

            <RegisterShape />
            <form className={"h-[80%] w-[45%] shadow-blur-10 rounded-md flex justify-center items-center " + (theme == "dark" ? " bg-modal-grey" : "bg-white")}>
                <div className=" h-4/5 w-4/5  flex flex-col items-center justify-between">
                    <p className={(theme == "dark" && " h4 text-white") + (theme == "light" && " h4")}>Registrar</p>
                    <div className=" h-3/5 w-full  grid grid-cols-2 items-center justify-items-center">

                        <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                            {theme == "dark" && <img src="./Assets/themeDark/iconUser.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/iconUser.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Seu Nome"
                            required
                                onChange={(e) => {
                                    setUser({ ...user, name: e.target.value })
                                }}
                            />
                        </div>
                        <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                            {theme == "dark" && <img src="./Assets/themeDark/iconUser.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/iconUser.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Seu Sobrenome"
                            required
                                onChange={(e) => {

                                    setUser({ ...user, surname: e.target.value })
                                }} />
                        </div>
                        <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                            {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Sua nome de usuário"
                            required
                                onChange={(e) => {
                                    setUser({ ...user, username: e.target.value })

                                }}
                            />
                        </div>
                        <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                            {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Sua senha"
                            required
                            type="password"
                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value })
                                }}
                            />
                        </div>
                        <div className={"col-start-1 col-end-3 " + (theme == "dark" ? "inputDark" : "inputLight")}>
                            {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Seu email"
                              required 
                                 onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                }}
                            />
                        </div>


                    </div>
                    <div className="w-[75%] flex justify-center">

                        <p className={'font-alata text-sm ' + (theme == "dark" && " text-white")}>Já possui uma conta?</p>
                        <p className="font-alata text-sm underline text-secondary hover:cursor-pointer hover:text-light-orange">Entrar</p>
                    </div>

                    <button className={theme == "dark" ? "buttonDark  w-[150px] h-[44px]" : "buttonLight w-[150px] h-[44px]"} type="submit"
                    onClick={(event)=>{
                        const response = post();
                        console.log(response)
                    }}
                    >Entrar</button>
                </div>
            </form>

        </div>

    )

}

export default page;