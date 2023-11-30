import { LoginShape } from '@/components/LoginShape';
import { text } from 'stream/consumers';
import {Input} from '@/components/Input';
const page = () => {

    const theme = 'light'
    return (
        <>
            <div className="h-[85%] w-screen flex justify-center items-center">
                <LoginShape />

                <div className={"h-[55%] w-1/4 shadow-blur-10 dark:shadow-blur-20 rounded-md flex justify-center items-center bg-white dark:bg-modal-grey"}>
                    <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                        <p className={"h4 " + (theme == "dark" && " text-white")}>Acesse sua conta</p>

                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome" />


                        <Input image={"Assets/themelight/IconUser.svg"} placeholder="Digite seu nome"  />

                        <div className="w-4/6 flex justify-between">
                            <p className={'font-alata text-sm underline hover:cursor-pointer hover:text-secondary ' + (theme == "dark" && " text-white")}>Esqueceu sua senha?</p>
                            <p className={'font-alata text-sm underline hover:cursor-pointer hover:text-secondary ' + (theme == "dark" && " text-white")}>Registre-se!</p>
                        </div>

                        <button className={ "bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}>Voltar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default page;