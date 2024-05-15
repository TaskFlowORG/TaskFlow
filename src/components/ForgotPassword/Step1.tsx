import { useRouter } from 'next/navigation';
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from 'next-themes';
import { emailService } from '@/services/services/EmailService';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const sendEmail = async (data: FormData) => {
        try {
            console.log(data.username);
            await emailService.sendEmailForgotPassword(data.username);
            setStep(2)
        } catch (error) {
            console.error("Error sending email", error);
            setForgotError("Erro no envio do email, tente novamente mais tarde ");
        }
    };

    const iconUser = theme === "light" ? "/img/themeLight/IconUser.svg" : "/img/themeDark/userIcon.svg";

    return (
        <>
            <h4 className="h4 leading-6 flex py-3 md:py-0">{t("forgot-password")}</h4>
            <span className="text-red-500 text-sm">{forgotError || errors.username?.message}</span>

            <div className='flex items-center flex-col h-3/5 w-full justify-between'>

            <form onSubmit={handleSubmit(sendEmail)} className=' w-4/5 flex flex-col items-center justify-between py-14'>
                <Input
                    className="inputRegister"
                    image={iconUser}
                    type="username"
                    placeholder={t("register-username")}
                    helperText={errors.username?.message}
                    register={{ ...register("username") }}
                    required
                    classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}

                />

                <div className="w-4/5 md:w-4/6 flex justify-center pb-4 md:pt-0">
                    <p className='font-alata text-xs lg:text-sm underline hover:cursor-pointer hover:text-primary' onClick={() => route.push("/login")}>
                    {t("already-have-account")}
                    </p>
                </div>

                <button type="submit" className="bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange">
                    {t("send")}
                </button>
            </form>
            </div>
           
        </>
    );
}
