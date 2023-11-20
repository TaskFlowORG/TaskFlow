import { RegisterShape } from "@/components/RegisterShape";

const page = () => {

    const theme = 'light'
    return (

        <div className="h-screen w-screen flex justify-center items-center">

            <RegisterShape />
            <div className={"h-[60%] w-[25%] shadow-blur-10 rounded-md flex justify-center items-center " + (theme == "dark" ? " bg-modal-grey" : "bg-white")}>
                <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className={ (theme == "dark" && " h4 text-white") + (theme == "light" && " h4")}>Registrar</p>

                    <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                        {theme == "dark" && <img src="./Assets/themeDark/iconUser.svg" alt="" className='h-[30px]' />}
                        {theme == "light" && <img src="./Assets/themeLight/iconUser.svg" alt="" className='h-[30px]' />}
                        <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Nome de Usuário" />
                    </div>
                    <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                        {theme == "dark" && <img src="./Assets/themeDark/iconUser.svg" alt="" className='h-[30px]' />}
                        {theme == "light" && <img src="./Assets/themeLight/iconUser.svg" alt="" className='h-[30px]' />}
                        <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Seu Email" />
                    </div>
                    <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                        {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                        {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                        <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Sua Senha" />
                    </div>
                    <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                        {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                        {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                        <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Confirme sua Senha" />
                    </div>

                    <div className="w-[75%] flex justify-center">

                        <p className={'font-alata text-sm ' + (theme == "dark" && " text-white")}>Já possui uma conta?</p>
                        <p className="font-alata text-sm underline text-orange hover:cursor-pointer hover:text-light-orange">Entrar</p>
                    </div>

                    <button className={theme == "dark" ? "buttonDark  w-[150px] h-[44px]": "buttonLight w-[150px] h-[44px]"}>Entrar</button>
                </div>
            </div>

            
        </div>

    )

}

export default page;