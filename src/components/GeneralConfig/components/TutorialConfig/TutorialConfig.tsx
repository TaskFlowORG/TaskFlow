import { UserContext } from "@/contexts/UserContext";
import { userService } from "@/services";
import { useContext, useState } from "react";

interface Props{
    isMade: boolean;
}

export const TutorialConfig = () => {
    const {user, setUser} = useContext(UserContext);

    const updateBack = async () => {
        if (!user || !setUser) return;
        const userUpdated = await userService.patch(user);
        setUser(userUpdated);
    };
    
    return (
        <>
            <div className="h-40 w-full flex items-start justify-between pt-6">
                <div className="w-[65%] flex  flex-col">
                    <p className="text-h3 font-alata dark:text-white ">Tutorial </p>
                    <p className="text-p font-alata">Compreenda perfeitamente todas as funcionalidades dentro do nosso aplicativo!</p>
                </div>
                <div className="w-fit h-full flex flex-col items-end justify-around">
                    <div className="bg-primary dark:bg-secondary w-40 h-11 rounded-md flex items-center justify-center cursor-pointer">
                        <p className="text-p font-alata text-white ">Refazer Tutorial</p>
                    </div>
                    <div className="bg-primary dark:bg-secondary w-40 h-11 rounded-md flex items-center justify-center cursor-pointer">
                        <p className="text-p font-alata text-white ">Tutorial Avançado</p>
                    </div>
                </div>
            </div>
            </>
    )
}