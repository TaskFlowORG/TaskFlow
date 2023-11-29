import { LoginShape } from '@/components/LoginShape';
import { text } from 'stream/consumers';

const page = () => {

    const theme = 'light'
    return (
        <>
            <div className="h-[85%] w-screen flex justify-center items-center">
                <LoginShape />

                <div className={"h-[55%] w-1/4 rounded-md flex justify-center items-center" + (theme == "dark" ? " bg-modal-grey shadow-blur-20" : " bg-white shadow-blur-10")}>
                    <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                        <p className={"h4 " + (theme == "dark" && " text-white")}>Acesse sua conta</p>

                        <div className={(theme == "dark" ? "inputDark" : "inputLight")}>
                            {theme == "dark" && <img src="./Assets/themeDark/iconUser.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/iconUser.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder='Digite seu Email' />
                        </div>


                        <div className={(theme == "dark" ? "inputDark" : "inputLight")}>
                            {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + ( theme == "dark" && "bg-modal-grey")} type="text" placeholder='Digite sua senha' />
                        </div>

                        <div className="w-4/6 flex justify-between">
                            <p className={'font-alata text-sm underline hover:cursor-pointer hover:text-secondary ' + (theme == "dark" && " text-white")}>Esqueceu sua senha?</p>
                            <p className={'font-alata text-sm underline hover:cursor-pointer hover:text-secondary ' + (theme == "dark" && " text-white")}>Registre-se!</p>
                        </div>

                        <button className={theme == "dark" ? "buttonDark  w-[150px] h-[44px]" : "buttonLight  w-[150px] h-[44px]"}>Entrar</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default page;