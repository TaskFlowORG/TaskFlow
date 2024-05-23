import { Button } from "@/components/Button"
import { useTranslation } from "react-i18next"

type ModalDelete = {
    close: () => void,
    deleteUser: () => void
}


export const DeleteAccountModal = ({ close, deleteUser }: ModalDelete) => {
    const { t } = useTranslation()

    return (
        <>
            <div className="w-full h-96 flex flex-col justify-center items-center rounded-sm  dark:bg-modal-grey shadow-blur-20">
                <div className="h-[70%] w-full flex flex-col items-center justify-around">
                    <h1 className="text-h3 font-alata text-primary dark:text-secondary ">{t("delete-account")}</h1>
                    <div className="text-dark dark:text-white flex flex-col gap-5 w-[80%]">
                        <div>
                            <p className="text-p font-montserrat text-center">{t("delete-account-desc")}</p>
                        </div>
                        <div>
                            <p className="text-p font-montserrat text-center">{t("delete-account-desc-recovery")}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around w-full">
                    <Button secondary text={t("delete-account-cancel")} fnButton={() => close()}></Button>
                    <Button fnButton={async () => {
                        deleteUser()
                        close()
                    }}></Button>
                </div>
            </div>
        </>
    )

}