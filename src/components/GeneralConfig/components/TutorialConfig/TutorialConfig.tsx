import { ModalTutorial } from "../ModalTutorial";
import { CenterModal } from "@/components/Modal";
import { useContext, useState } from "react";
import { userService } from "@/services";
import { UserContext } from "@/contexts/UserContext";
import { useTranslation } from "next-i18next";

export const TutorialConfig = () => {
    const [modalRefazer, setModalRefazer] = useState<boolean>(false);
    const { user, setUser } = useContext(UserContext);

    const { t } = useTranslation();

    const refazerTutorial = () => {
        if (!user || !setUser) return;
        return <CenterModal setCondition={() => setModalRefazer(true)} condition={modalRefazer}><ModalTutorial close={() => setModalRefazer(false)} updateTutorial={() => updateBack()} /></CenterModal>

    }

    const updateBack = () => {
        if (!user || !setUser) return;
        user.configuration.isTutorialMade = false;
        userService.patch(user).then((updatedUser) => {
            setUser(updatedUser);
        });
    }

    return (
        <>
            <div className="h-40 w-full flex items-start justify-between pt-6">
                <div className="w-[65%] flex  flex-col">
                    <div>
                        <p className="text-h3 font-alata dark:text-white ">{t("tutorial-config-title")} </p>
                    </div>
                    <div>
                        <p className="text-p font-alata">{t("tutorial-config-desc")}</p>
                    </div>
                </div>
                <div className="w-fit h-full flex flex-col justify-around">
                    <div className="bg-primary dark:bg-secondary w-40 h-11 rounded-md flex items-center justify-center cursor-pointer " onClick={() => setModalRefazer(true)}>
                        <p className="text-p font-alata text-white ">{t("redo-tutorial-config")}</p>
                    </div>
                </div>
                {modalRefazer ? refazerTutorial() : null}
            </div>
        </>
    )
}