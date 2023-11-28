'use client'
import { RegisterShape } from "@/components/RegisterShape";
import {useForm} from 'react-hook-form'
import { Api } from '@/services/api'
import { Input } from "@/components/Input";
import * as z from 'zod'


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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode : 'all',
        reValidateMode: 'onChange',
        zodResolver: schema});

    return (
        <div className="h-[90%] w-screen flex justify-center items-center">

            <RegisterShape />
            <form onSubmit={handleSubmit((data) => console.log(data))}
                className={"h-[80%] w-[45%] shadow-blur-10 rounded-md flex justify-center items-center " + (theme == "dark" ? " bg-modal-grey" : "bg-white")}>
                <div className=" h-4/5 w-4/5  flex flex-col items-center justify-between">
                    <p className={(theme == "dark" && " h4 text-white") + (theme == "light" && " h4")}>Registrar</p>
                    <div className=" h-3/5 w-full  grid grid-cols-2 items-center justify-items-center">

                  <Input type="text" placeholder="Seu nome"  theme={theme} error="erro" ></Input>


                        <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                            {theme == "dark" && <img src="./Assets/themeDark/iconUser.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/iconUser.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Seu Sobrenome"
                                {...register('surname', { required: true })} />
                        </div>
                        <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                            {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Sua nome de usuário"
                              {...register('username', {required: true})}
                            />
                        </div>
                        <div className={theme == "dark" ? "inputDark" : "inputLight"}>
                            {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Sua senha"
                            {...register('password', {required: true})}
                            />
                        </div>
                        <div className={"col-start-1 col-end-3 " + (theme == "dark" ? "inputDark" : "inputLight")}>
                            {theme == "dark" && <img src="./Assets/themeDark/padlock.svg" alt="" className='h-[30px]' />}
                            {theme == "light" && <img src="./Assets/themeLight/padlock.svg" alt="" className='h-[30px]' />}
                            <input className={"w-5/6 h-full outline-none " + (theme == "dark" && "bg-modal-grey")} type="text" placeholder="Seu email"
                               {...register('email', {required: true})}
                            />
                        </div>


                    </div>
                    <div className="w-[75%] flex justify-center">

                        <p className={'font-alata text-sm ' + (theme == "dark" && " text-white")}>Já possui uma conta?</p>
                        <p className="font-alata text-sm underline text-secondary hover:cursor-pointer hover:text-light-orange">Entrar</p>
                    </div>

                    <button className={theme == "dark" ? "buttonDark  w-[150px] h-[44px]" : "buttonLight w-[150px] h-[44px]"} type="submit">Entrar</button>
                </div>
            </form>

        </div>

    )

}

export default page;