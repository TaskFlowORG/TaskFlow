import { useTheme } from "next-themes";
import { Input } from "../Input"
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userService } from "@/services";
import { emailService } from "@/services/services/EmailService";
import { useEffect, useState } from "react";

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

export const Step3 = () => {
    const [user, setUser] = useState<FormData>({ password: "", confirmPassword: "" });
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
    });
    const { theme } = useTheme();
    const router = useRouter();


    const resetPass = async (data: FormData) => {
        try {
            const code = await emailService.getCode();
            code.map(async (c) => {
                console.log("senha:", user.password);

                await userService.upDatePassword(c.username, data.password);
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
            <div className="flex items-center flex-col md:h-96 lg:w-2/6 md:w-1/2 w-10/12 1.5xl:w-1/4 shadow-blur-10 rounded-md bg-white dark:bg-modal-grey justify-between py-9">
                <h4 className="h4 leading-6 flex py-3 md:py-0">Redefinir senha</h4>

                <form onSubmit={handleSubmit(resetPass)} className='gap-2 w-4/5 pt-10 flex flex-col items-center justify-center'>
                    <Input
                        className="inputRegister"
                        image={iconPassword}
                        type="password"
                        placeholder="Digite sua senha"
                        helperText={errors.password?.message}
                        register={{ ...register("password") }}
                        required
                        classNameInput={
                            "w-5/6 h-10 md:h-full outline-none  px-5 dark:bg-modal-grey"
                        }
                    />
                    <Input
                        className="inputRegister"
                        image={iconPassword}
                        placeholder="Confirme sua senha"
                        type="password"
                        helperText={errors.confirmPassword?.message}
                        register={{ ...register("confirmPassword") }}
                        required
                        classNameInput={
                            "w-5/6 h-10 md:h-full outline-none px-5 dark:bg-modal-grey"
                        }
                    />

                <button type="submit" className="bg-primary rounded-md h5 text-white hover:bg-light-pink w-[150px] h-[44px] dark:bg-secondary dark:hover:bg-light-orange">
                    Enviar
                </button>
            </form>
        </div >
        </>
    );
}