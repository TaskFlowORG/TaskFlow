import { Button } from "@/components/Button"
import { useTranslation } from "react-i18next"

type ModalTutorial = {
    close: () => void,
    updateTutorial: () => void
}

export const ModalTutorial = ({close, updateTutorial }: ModalTutorial) => {

    const { t } = useTranslation()
    
    return (
        <>
            <div className="w-full h-min py-10 gap-8 flex flex-col justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                <div className="h-min w-full flex flex-col items-center gap-4">
                    <h1 className="h3 text-primary dark:text-secondary ">{t("redo-tutorial-config")}</h1>
                    <div className="text-dark dark:text-white px-10">
                        <p className="p text-center">{t("redo-tutorial-config-desc")}</p>
                    </div>
                </div>
                <div className="flex justify-around w-full">
                    <Button secondary text={t("delete-account-cancel")} fnButton={() => close()}></Button>
                    <Button  fnButton={async () => {
                        updateTutorial()
                        close()
                    }}></Button>
                </div>
            </div>
        </>
    )

}