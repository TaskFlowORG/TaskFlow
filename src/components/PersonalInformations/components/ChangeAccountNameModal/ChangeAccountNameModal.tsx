import { Button } from "@/components/Button";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { If } from "@/components/If";
import { UserContext } from "@/contexts/UserContext";
import { userService } from "@/services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authentication } from "@/services/services/Authentication";
import { Input } from "@/components/Input";
import { UserChangeUsername } from "@/models/user/user/UserChangeUsername";
import { useRouter } from "next/navigation";

interface ModalUsername {
    close: () => void;
}

export const ChangeAccountNameModal = ({ close }: ModalUsername) => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const { user } = useContext(UserContext);
    const router = useRouter();

    const schema = z.object({
        username: z
            .string(),
        newUsernameZod: z
            .string()
            .min(3, { message: t("username-min") })
            .max(20, { message: t("username-max") }),
    })

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
        if (!verifyUsername(data.username)) {
            setError("username", {
                message: t("username-incorrect"),
                type: "manual",
            });
        } else if (user?.username === data.newUsernameZod) {
            setError("newUsernameZod", {
                message: t("same-username"),
                type: "manual",
            });
        } else {
            const nUser = new UserChangeUsername(data.newUsernameZod);
            try {
                await userService.changeUsername(nUser);
                authentication.logout();
                router.push("/login");
            } catch (error: any) {
                if (!error.response) return;
                if (error.response.status === 409) {
                    setError("newUsernameZod", {
                        message: t("username-exists"),
                        type: "manual",
                    });
                }
            }
        }
    };

    const verifyUsername = (name: string) => {
        if (user?.username == name) {
            return true
        } else {
            return false
        }
    };

    return (
        <div className="w-full h-96 flex flex-col justify-center items-center rounded-sm dark:bg-modal-grey shadow-blur-20">
            <div className="h-96 w-full flex flex-col items-center justify-around">

                <If condition={step === 0}>
                    <>
                        <h1 className="text-h3 font-alata text-primary dark:text-secondary">Mudar o nome de usuário</h1>
                        <div className="text-dark dark:text-white flex flex-col justify-center gap-4 h-32">
                            <div>
                                <p className="font-alata text-p text-center">Você tem certeza que deseja alterar seu nome de usuário?</p>
                            </div>
                            <div>
                                <p className="font-alata text-p  text-center text-red-600">Você só pode alterar seu nome de usuário a cada 30 dias!</p>
                            </div>
                        </div>
                    </>
                </If>
                <If condition={step === 1}>
                    <>
                        <h1 className="text-h3 font-alata text-primary dark:text-secondary">Mudar o nome de usuário</h1>
                        <div className="text-dark dark:text-white flex flex-col justify-center h-32">
                            <Input
                                required
                                register={{ ...register("username") }}
                                helperText={errors.username?.message}
                                classNameInput={"text-p font-montserrat shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-96 pl-4 focus:outline-none h-12"}
                                placeholder={"Nome de usuário atual"}
                            />
                            <Input
                                required
                                register={{ ...register("newUsernameZod") }}
                                helperText={errors.newUsernameZod?.message}
                                classNameInput={"text-p font-montserrat shadow-blur-10 bg-input-grey-opacity border-2 border-input-grey border-opacity-[70%] rounded-md w-96 pl-4 focus:outline-none h-12"}
                                placeholder={"Novo nome de usuário"}
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
                        <Button other="min-w-40 max-w-40" text="Alterar nome" fnButton={handleSubmit(onSubmit)} />
                    </If>
                </div>
            </div>


        </div>
    );
};