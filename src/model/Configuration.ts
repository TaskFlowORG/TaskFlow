import { User } from "./User";
import { Theme } from "./enums/Theme";
import { Language } from "./enums/Language";

export class Configuration {
    id: Number;
    notificTasks: Boolean;
    notificAtAddMeInAGroup: Boolean;
    notificWhenChangeMyPermission: Boolean;
    notificMyPointsChange: Boolean;
    notificSchedules: Boolean;
    notificMylateProject: Boolean;
    notificChats: Boolean;
    notificComments: Boolean;
    primaryColor: String;
    secondaryColor: String;

    theme: Theme;
    fontSize: Number;

    libras: Boolean;
    textToSound: Boolean;
    language:Language;

    constructor(id: Number, notificTasks: Boolean, notificAtAddMeInAGroup: Boolean, notificWhenChangeMyPermission: Boolean, notificMyPointsChange: Boolean, notificSchedules: Boolean, notificMylateProject: Boolean, notificChats: Boolean, notificComments: Boolean, primaryColor: String, secondaryColor: String, theme: Theme, fontSize: Number, libras: Boolean, textToSound: Boolean, language:Language) {
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
