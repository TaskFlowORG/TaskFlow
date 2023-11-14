import { RegisterShape } from "@/components/RegisterShape";

const page = () =>{

    return(

        <div className="h-screen w-screen flex justify-center items-center">
       
        <RegisterShape />
        <div className="h-[595px] w-[460px] shadow-blur-10 rounded-md flex justify-center items-center bg-white">
            <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                <p className="h4">Acesse sua conta</p>

                <div className="w-full flex justify-center items-center gap-2">
                    <img src="./Assets/IconUser.svg" alt="" className='h-[30px]' />
                    <input className="input" type="text" />
                </div>

                <div className="w-full flex justify-center items-center gap-2">
                    <img src="./Assets/padlock.svg" alt="" className='h-[30px]' />
                    <input className="input" type="text" />
                </div>

                <div className="w-[75%] flex justify-between">
                    <p className='font-alata text-sm underline hover:cursor-pointer'>Esqueceu sua senha?</p>
                    <p className='font-alata text-sm underline hover:cursor-pointer'>Registre-se!</p>
                </div>

                <button className='bg-pink w-[150px] h-[44px] rounded-md h5 text-white'>Entrar</button>
            </div>
        </div>
    </div>
        
    )

}

export default page;