"use client"
import { Chat} from "@/models";
import { createContext} from "react";

type TutorialContext = {
    isTutorialMade?: boolean;
    setIsTutorialMade?: (isMade?:boolean) => void;
    step?: number;
    setStep?: (step?:number) => void;
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const TutorialContext = createContext<TutorialContext>({});

