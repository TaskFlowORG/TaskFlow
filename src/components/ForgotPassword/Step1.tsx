import { useRouter } from 'next/navigation';
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from 'next-themes';
import { emailService } from '@/services/services/EmailService';
import { useState } from 'react';

const schema = z.object({
    username: z
        .string()
        .min(3, { message: "Digite no mínimo 3 caracteres" })
        .max(20, { message: "Digite no máximo 20 caracteres" })
});

type FormData = z.infer<typeof schema>;

interface Props {
    setStep: (number: number) => void;
}

export const Step1 = ({ setStep }: Props) => {
    const [forgotError, setForgotError] = useState<string>("");
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const route = useRouter();
    const { theme } = useTheme();

    const sendEmail = async (data: FormData) => {
        try {
            console.log(data.username);
            await emailService.sendEmail(data.username);
            setStep(2);
        } catch (error) {
            console.error("Error sending email", error);
            setForgotError("Usuário inválido/inexistente");
        }
    };

    const iconUser = theme === "light" ? "/img/themeLight/IconUser.svg" : "/img/themeDark/iconUser.svg";

    return (
        <>
            <div className="flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey justify-between py-9">
                <h4 className="h4 leading-6 flex py-3 md:py-0">Esqueceu sua senha?</h4>
                <span className="text-red-500 text-sm">{forgotError || errors.username?.message}</span>

                <form onSubmit={handleSubmit(sendEmail)} className='gap-2 w-4/5 pt-10 flex flex-col items-center justify-center'>
                <Input
                        className="inputRegister"
                        image={iconUser}
                        type="username"
                        placeholder="Digite sua senha"
                        helperText={errors.username?.message}
                        register={{ ...register("username") }}
                        required
                        classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}
                        
                    />

                    <div className="w-4/5 md:w-4/6 flex justify-center pb-4 md:pt-0">
                        <p className='font-alata text-xs lg:text-sm underline hover:cursor-pointer hover:text-primary' onClick={() => route.push("/login")}>
                            Já possui uma conta
                        </p>
                    </div>

                    <button type="submit" className="bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange">
                        Enviar
                    </button>
                </form>
            </div>
        </>
    );
}
