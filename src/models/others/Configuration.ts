import { AllArgsConstructor } from "@/utils";
import { Theme } from "react-select";
import { Language } from "../enums/Language";

@AllArgsConstructor
export class Configuration {
    id!: number;
    notifications!: boolean;
    primaryColor!: string;
    secondaryColor!: string;
    theme!: Theme;
    fontSize!: number;
    language!: Language;
    libras!: boolean;
    textToSound!: boolean;
    notificTasks!: boolean;
    notificAtAddMeInAGroup!: boolean;
    notificWhenChangeMyPermission!: boolean;
    notificMyPointsChange!: boolean;
    notificSchedules!: boolean;
    notificDeadlines!: boolean;
    notificChats!: boolean;
    notificComments!: boolean;

    constructor(id: number, notifications: boolean, primaryColor: string, secondaryColor: string, 
        theme: Theme, fontSize: number, language: Language, libras: boolean, textToSound: boolean, 
        notificTasks: boolean, notificAtAddMeInAGroup: boolean, notificWhenChangeMyPermission: boolean, 
        notificMyPointsChange: boolean, notificSchedules: boolean, notificDeadlines: boolean, 
        notificChats: boolean, notificComments: boolean) {}


    equals = (obj: any) => {
        return obj instanceof Configuration && obj.id === this.id;
    }
}