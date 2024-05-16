import { Button } from "@/components/Button"
import { SetStateAction, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { ProgressBar } from "@/components/Register"
import { If } from "@/components/If"
import { UserContext } from "@/contexts/UserContext"
import { InputFieldConfig } from "../InputFieldConfig"

interface ModalDelete {
    close: () => void,
    deleteUser: () => void
}

export const ChangeAccountNameModal = ({ close }: ModalDelete) => {
    const { t } = useTranslation()
    const [step, setStep] = useState(0);
    const { user } = useContext(UserContext)
    const [error, setError] = useState(false)
    const [newUsername, setNewUsername] = useState("")

    const handleNextStep = () => {
        if (step < 2) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step < 2) {
            setStep(step - 1);
        }
    };

    const verifyUsername = async (newUsername?: String) => {
        if (user?.username != newUsername) {
            setError(true)
        }
        setError(false)
    }

    return (
        <>
            <div className="w-full h-96 flex flex-col justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                <ProgressBar step={step} color={""} />
                <div className="h-[70%] w-full flex flex-col items-center justify-around">
                    <If condition={step == 0}>
                        <>
                            <h1 className="h3 text-primary dark:text-secondary ">Mudar o nome de usuário</h1>
                            <div className="text-dark dark:text-white flex flex-col gap-5">
                                <div>
                                    <p className="p text-center">Você tem certeza que deseja alterar seu nome de usuário?</p>

                                </div>
                                <div>
                                    <p className="p text-center text-red-600">Você só pode alterar seu nome de usuário a cada 30 dias!</p>
                                </div>
                            </div>
                        </>
                    </If>
                    <If condition={step == 1}>
                        <>
                            <h1 className="h3 text-primary dark:text-secondary ">Mudar o nome de usuário</h1>
                            <div className="text-dark dark:text-white flex flex-col items-center gap-5">
                                <div className="flex w-80">
                                    <InputFieldConfig
                                        hasError={error}
                                        type="text"
                                        label=""
                                        id="username"
                                        placeholder={"Nome de usuário atual"}
                                        onChange={(e: { target: { value: SetStateAction<string> } }) =>
                                            (setNewUsername(e.target.value), verifyUsername(newUsername), console.log(newUsername))
                                        }
                                        helperText={"Nome de usuário inválido"}
                                    />
                                </div>
                                <div className="flex w-80">
                                    <InputFieldConfig
                                        hasError={error}
                                        type="text"
                                        label=""
                                        id="newUsername"
                                        placeholder={"Novo nome de usuário"}
                                    />
                                </div>
                                <div>
                                    <p className="p text-center text-red-600">Você só pode alterar seu nome de usuário a cada 30 dias!</p>
                                </div>
                            </div>
                        </>
                    </If>
                </div>

                <div className="flex justify-around w-full">
                    <If condition={step == 0}>
                        <Button secondary text={t("cancel")} fnButton={
                            () => { close() }}>
                        </Button>
                    </If>
                    <If condition={step > 0}>
                        <Button secondary text={t("back")} fnButton={
                            () => { handlePreviousStep() }}>
                        </Button>
                    </If>
                    <Button fnButton={async () => {
                        handleNextStep()
                    }}></Button>
                </div>
            </div>

        </>
    )

}