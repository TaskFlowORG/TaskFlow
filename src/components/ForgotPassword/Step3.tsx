import { useTheme } from "next-themes";
import { Input } from "../Input"
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userService } from "@/services";
import { emailService } from "@/services/services/EmailService";
import { useState } from "react";

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

interface UserData {
    password: string;
    confirmPassword: string;
}

type FormData = z.infer<typeof schema>;
export const Step3 = () => {
    const [user, setUser] = useState<UserData>({ password: "", confirmPassword: "" });
    const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
    });
    const { theme } = useTheme();
    const router = useRouter();

    const resetPass = async () => {
        try {
            const code = await emailService.getCode();
            code.map(async (c) => {
                console.log(user.password);
                
                await userService.upDatePassword(c.username, user.password);
            });
            router.push("/login");
        } catch (error) {
            console.error("Erro ao redefinir a senha:", error);
        }
    };

    const iconPassword = theme === "light" ? "/img/themeLight/password.svg" : "/img/themeDark/password.svg";
    return (
        <>
            <div className="flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey  justify-between py-8">
                <h4 className="h4 leading-6 flex py-3 md:py-0">Redefinir Senha</h4>

                <div className='h-4/5 w-4/5 pt-10 flex flex-col items-center gap-2'>
                    <Input
                        className="inputRegister"
                        image={iconPassword}
                        type="password"
                        placeholder="Digite sua senha"
                        helperText={errors.password?.message}
                        register={{ ...register("password") }}
                        required
                        classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}
                    />
                    <Input
                        className="inputRegister"
                        image={iconPassword}
                        placeholder="Confirme sua senha"
                        type="password"
                        helperText={errors.confirmPassword?.message}
                        register={{ ...register("confirmPassword") }}
                        required
                        classNameInput={"w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"}
                    />
                </div>

                <div className='flex justify-end w-4/5 pt-7 md:pt-0'>
                    <button className={"bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange"} onClick={resetPass}>
                        Confirmar
                    </button>
                </div>

            </div>
        </>
    )
}