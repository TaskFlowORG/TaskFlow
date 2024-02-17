import { User } from "./User";
import { Theme } from "./enums/Theme";
import { Language } from "./enums/Language";

export class Configuration {
    id: number;
    notificTasks: boolean;
    notificAtAddMeInAGroup: boolean;
    notificWhenChangeMyPermission: boolean;
    notificMyPointsChange: boolean;
    notificSchedules: boolean;
    notificMylateProject: boolean;
    notificChats: boolean;
    notificComments: boolean;
    primaryColor: string;
    secondaryColor: string;

    theme: Theme;
    fontSize: number;

    libras: boolean;
    textToSound: boolean;
    language:Language;

    constructor(id: number, notificTasks: boolean, notificAtAddMeInAGroup: boolean, notificWhenChangeMyPermission: boolean, notificMyPointsChange: boolean, notificSchedules: boolean, notificMylateProject: boolean, notificChats: boolean, notificComments: boolean, primaryColor: string, secondaryColor: string, theme: Theme, fontSize: number, libras: boolean, textToSound: boolean, language:Language) {
        this.id = id;
        this.notificTasks = notificTasks;
        this.notificAtAddMeInAGroup = notificAtAddMeInAGroup;
        this.notificWhenChangeMyPermission = notificWhenChangeMyPermission;
        this.notificMyPointsChange = notificMyPointsChange;
        this.notificSchedules = notificSchedules;
        this.notificMylateProject = notificMylateProject;
        this.notificChats = notificChats;
        this.notificComments = notificComments;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.theme = theme;
        this.fontSize = fontSize;
        this.libras = libras;
        this.textToSound = textToSound;
        this.language = language;
    }
    
}
