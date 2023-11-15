import { LoginShape } from '@/components/LoginShape';

const page = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <LoginShape />
            
            <div className="h-[450px] w-[460px] shadow-blur-10 rounded-md flex justify-center items-center bg-white">
                <div className=" h-4/5 w-4/5 flex flex-col items-center justify-between">
                    <p className="h4">Acesse sua conta</p>

                    <div className="input">
                        <img src="./Assets/IconUser.svg" alt="" className='h-[30px]' />
                        <input className="w-5/6 h-full outline-none" type="text" />
                    </div>
                    

                    <div className="input">
                        <img src="./Assets/padlock.svg" alt="" className='h-[30px]' />
                        <input className="w-5/6 h-full outline-none" type="text" />
                    </div>

                    <div className="w-4/6 flex justify-between">
                        <p className='font-alata text-sm underline hover:cursor-pointer'>Esqueceu sua senha?</p>
                        <p className='font-alata text-sm underline hover:cursor-pointer'>Registre-se!</p>
                    </div>

                    <button className='bg-pink w-[150px] h-[44px] rounded-md h5 text-white hover:bg-light-pink'>Entrar</button>
                </div>
            </div>
        </div>
    );
}

export default page;