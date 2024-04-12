import { ModalTutorial } from "../ModalTutorial";
import { CenterModal } from "@/components/Modal";
import { useContext, useState } from "react";
import { userService } from "@/services";
import { UserContext } from "@/contexts/UserContext";

export const TutorialConfig = () => {
    const [modalRefazer, setModalRefazer] = useState<boolean>(false);
    const { user, setUser } = useContext(UserContext);

    const refazerTutorial = () => {
        if (!user || !setUser) return;
        return <CenterModal setCondition={() => setModalRefazer(true)} condition={modalRefazer}><ModalTutorial close={() => setModalRefazer(false)} updateTutorial={() => updateBack()} /></CenterModal>

    }

    const updateBack = () => {
        console.log("Aaaaaaaaaaaa");

        if (!user || !setUser) return;
        console.log(user.configuration.isTutorialMade);

        user.configuration.isTutorialMade = false;
        userService.patch(user).then((updatedUser) => {
            setUser(updatedUser);
        });
        console.log(user.configuration.isTutorialMade);

    }

    return (
        <>
            <div className="h-40 w-full flex items-start justify-between pt-6">
                <div className="w-[65%] flex  flex-col">
                    <div>
                        <p className="text-h3 font-alata dark:text-white ">Tutorial </p>
                    </div>
                    <div>
                        <p className="text-p font-alata">Compreenda perfeitamente todas as funcionalidades dentro do nosso aplicativo!</p>
                    </div>
                </div>
                <div className="w-fit h-full flex flex-col items-end justify-around">
                    <div className="bg-primary dark:bg-secondary w-40 h-11 rounded-md flex items-center justify-center cursor-pointer " onClick={() => setModalRefazer(true)}>
                        <p className="text-p font-alata text-white ">Refazer Tutorial</p>
                    </div>
                    <div className="bg-primary dark:bg-secondary w-40 h-11 rounded-md flex items-center justify-center cursor-pointer">
                        <p className="text-p font-alata text-white ">Tutorial Avançado</p>
                    </div>
                </div>
                {modalRefazer ? refazerTutorial() : null}
            </div>
        </>
    )
}