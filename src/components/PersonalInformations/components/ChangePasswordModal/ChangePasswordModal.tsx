import { Button } from "@/components/Button";
import { use, useState } from "react";
import { useTranslation } from "react-i18next";
import { If } from "@/components/If";
import { userService } from "@/services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authentication } from "@/services/services/Authentication";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";


interface ModalPassword {
    close: () => void;
}

export const ChangePasswordModal = ({ close }: ModalPassword) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const router = useRouter();

    const schema = z
        .object({
            password: z.string(),
            newPassword: z
                .string()
                .min(8, t("password-min"))
                .regex(/[a-z]/, t("password-lowercase"))
                .regex(/[A-Z]/, t("password-uppercase"))
                .regex(/[0-9]/, t("password-number"))
                .regex(/[^a-zA-Z0-9]/, t("password-special")),
            confirmPassword:
                z.string(),
        })
        .refine(
            (values) => {
                return values.newPassword === values.confirmPassword;
            },
            {
                message: t("password-match"),
                path: ["confirmPassword"],
            }
        );

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
    });

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const onSubmit = async (data: FormData) => {
        console.log(data.password);
        
        const userChangePassword = {
            password: data.password,
            newPassword: data.newPassword,
        }
        try {
            await userService.changePassword(userChangePassword);
            authentication.logout();
            router.push("/login");
        } catch (error: any) {
            if (!error.response) return
            if (error.response.status === 409) {
                setError("password", {
                    message: t("password-incorrect"),
                    type: "manual",
                });
            }
        }
    }

    return (
        <div className="w-full h-96 flex flex-col justify-center items-center rounded-sm dark:bg-modal-grey shadow-blur-20">
            <div className="h-96 w-full flex flex-col items-center justify-around">
                <If condition={step === 0}>
                    <>
                        <h1 className="text-h3 font-alata text-primary dark:text-secondary">{t("change-password")}</h1>
                        <div className="text-dark dark:text-white flex flex-col justify-center gap-4 h-32">
                            <div>
                                <p className="font-alata text-p text-center">{t("confirm-password-change")}</p>
                            </div>
                        </div>
                    </>
                </If>
                <If condition={step === 1}>
                    <>
                        <h1 className="text-h3 font-alata text-primary dark:text-secondary">Alterar senha</h1>
                        <div className="text-dark dark:text-white flex flex-col justify-center h-32 gap-2">
                            <Input
                                required
                                register={{ ...register("password") }}
                                helperText={errors.password?.message}
                                classNameInput={"text-p font-montserrat shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-96 pl-4 focus:outline-none h-12"}
                                placeholder={t("current-password")}
                            />
                            <Input
                                required
                                register={{ ...register("newPassword") }}
                                helperText={errors.newPassword?.message}
                                classNameInput={"text-p font-montserrat shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-96 pl-4 focus:outline-none h-12"}
                                placeholder={t("new-password")}
                            />
                            <Input
                                required
                                register={{ ...register("confirmPassword") }}
                                helperText={errors.confirmPassword?.message}
                                classNameInput={"text-p font-montserrat shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-96 pl-4 focus:outline-none h-12"}
                                placeholder={t("confirm-new-password")}
                            />
                        </div>
                    </>
                </If>
                <div className="flex justify-around w-96">
                    <If condition={step === 0}>
                        <Button secondary other="min-w-40 max-w-40" text={t("cancel")} fnButton={() => close()} />
                    </If>
                    <If condition={step > 0}>
                        <Button secondary other="min-w-40 max-w-40" text={t("back")} fnButton={() => handlePreviousStep()} />
                    </If>
                    <If condition={step === 0}>
                        <Button other="min-w-40 max-w-40" fnButton={() => (handleNextStep())} />
                    </If>
                    <If condition={step === 1}>
                        <Button other="min-w-40 max-w-40" text={t("confirm")} fnButton={handleSubmit(onSubmit)} />
                    </If>
                </div>
            </div>
        </div>
    );
};