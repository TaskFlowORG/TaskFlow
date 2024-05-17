import { useTheme } from "next-themes";
import { Input } from "../Input"
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userService } from "@/services";
import { emailService } from "@/services/services/EmailService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const schema = z
    .object({
        password: z
            .string()
            .min(8, 'A senha deve ter pelo menos 8 caracteres.')
            .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
            .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
            .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
            .regex(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial.'),
        confirmPassword: z
            .string(),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Senhas não coincidem.",
            path: ["confirmPassword"],
        }
    )


type FormData = z.infer<typeof schema>;

interface Props{
    setForgotPassword: ( forgotPassword: boolean) => void;
}

export const Step3 = ({setForgotPassword} : Props) => {
    const [user, setUser] = useState<FormData>({ password: "", confirmPassword: "" });
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
    });
    const { theme } = useTheme();
    const router = useRouter();
    const { t } = useTranslation();


    const resetPassword = async (data: FormData) => {
        try {
            const code = await emailService.getCode();
            code.map(async (c) => {
                console.log("senha:", user.password);

                await userService.upDatePassword(c.username, data.password);
                 setForgotPassword(false)
            });
            router.push("/login");
        } catch (error) {
            console.error("Erro ao redefinir a senha:", error);
        }
    };

    const iconPassword =
        theme === "light"
            ? "/img/themeLight/password.svg"
            : "/img/themeDark/password.svg";

    return (
        <>
                <h4 className="h4 leading-6 flex py-5 md:py-0">{t("newPassword")}</h4>

                <div className='flex items-center flex-col h-[73%] w-full justify-between'>

                    <form onSubmit={handleSubmit(resetPassword)} className='w-4/5 flex flex-col items-center justify-between py-10'>
                        <Input
                            className="inputRegister"
                            image={iconPassword}
                            type="password"
                            placeholder={t("type-password")}
                            helperText={errors.password?.message}
                            register={{ ...register("password") }}
                            required
                            classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}
                        />
                        <Input
                            className="inputRegister"
                            image={iconPassword}
                            placeholder={t("type-confirm-password")}
                            type="password"
                            helperText={errors.confirmPassword?.message}
                            register={{ ...register("confirmPassword") }}
                            required
                            classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}
                        />

                        <button type="submit" className="bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange">
                        {t("confirm")}
                        </button>
                    </form>
                    </div>
              
            </>
            );
}