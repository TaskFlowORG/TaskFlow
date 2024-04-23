"use client"

import { useRouter } from 'next/navigation';
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from 'next-themes';
import { useState } from 'react';


const schema = z.object({
    email: z.string().email({ message: "Email inválido" })
});

type FormData = z.infer<typeof schema>;

export const ForgotPassword = () => {
    const { theme } = useTheme();
    const route = useRouter();
    const [otp, setOtp] = useState<number>();
    const [user, setUser] = useState<FormData>({ email: "" });
    const{ register, formState: { errors } } = useForm<FormData>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
      });

   

    // const sendEmail = async () => {
    //     const OTP = Math.floor(Math.random() * 9000 + 1000);
    //     setOtp(OTP);

    //     const email = {
    //         from: "helofogaca2015@gmail.com",
    //         to: user.email,
    //         subject: "Redefinir senha",
    //         text: `Um pedido de mudança de senha foi pedido neste endereço de email\nSeu código de verificação é: ${OTP}\nCaso não tenha sido você, desconsidere esta mensagem.`
    //     };

    //     try {
    //         await transporter.sendMail(email);
    //         console.log('Email enviado com sucesso!');
    //     } catch (error) {
    //         console.error('Erro ao enviar email:', error);
    //     }
    // };

    const iconMail = theme === "light" ? "/img/themeLight/mail.svg" : "/img/themeDark/mail.svg";

    return (
        <>
            <div className="flex h-5/6 w-screen absolute justify-center items-center text-[#333] dark:text-[#FCFCFC]">
                <div className="flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey justify-between py-9">
                    <h4 className="h4 leading-6 flex py-3 md:py-0">Esqueceu sua senha?</h4>

                    <div className='gap-2 h-4/5 w-4/5 flex flex-col items-center justify-center'>
                        <Input
                            className="inputRegister"
                            image={iconMail}
                            placeholder="Digite seu email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            helperText={errors.email?.message}
                            register={{ ...register("email") }}
                            required
                            classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}
                        />

                        <div className="w-4/5 md:w-4/6 flex justify-center">
                            <p className={'font-alata text-xs lg:text-sm underline hover:cursor-pointer hover:text-primary '} onClick={() => route.push("/login")}>Já possui uma conta</p>
                        </div>
                    </div>

                    <div className='flex justify-end w-4/5'>
                        <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
