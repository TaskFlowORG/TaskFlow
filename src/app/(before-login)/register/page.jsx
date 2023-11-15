import { RegisterShape } from "@/components/RegisterShape";

const page = () => {

    return (

        <div className="h-screen w-screen flex justify-center items-center">

            <RegisterShape />
            <div className="h-[595px] w-[460px] shadow-blur-10 rounded-md flex justify-center items-center bg-white">
                <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className="h4">Registrar</p>

                    <div className="input ">
                        <img src="./Assets/IconUser.svg" alt="" className='h-[30px]' />
                        <input className="w-5/6 h-full outline-none" type="text" placeholder="Nome de Usuário" />
                    </div>
                    <div className="input">
                        <img src="./Assets/IconUser.svg" alt="" className='h-[30px]' />
                        <input className="w-5/6 h-full outline-none" type="text" placeholder="Seu Email"/>
                    </div>
                    <div className="input">
                        <img src="./Assets/IconUser.svg" alt="" className='h-[30px]' />
                        <input className="w-5/6 h-full outline-none" type="text" placeholder="Sua Senha"/>
                    </div>
                    <div className="input">
                        <img src="./Assets/padlock.svg" alt="" className='h-[30px]' />
                        <input className="w-5/6 h-full outline-none" type="text" placeholder="Confirme sua Senha"/>
                    </div>

                    <div className="w-[75%] flex justify-center">
                       
                        <p className='font-alata text-sm '>Já possui uma conta?</p>
                        <p className="font-alata text-sm underline text-orange hover:cursor-pointer">Entrar</p>
                    </div>

                    <button className='bg-pink w-[150px] h-[44px] rounded-md h5 text-white hover:bg-light-pink'>Entrar</button>
                </div>
            </div>
        </div>

    )

}

export default page;