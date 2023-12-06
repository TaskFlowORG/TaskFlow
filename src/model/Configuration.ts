import { User } from "./User";
import { Theme } from "./enums/Theme";
import { Language } from "./enums/Language";

export class Configuration {
    id: Number;
    notifications: Boolean;
    primaryColor: String;
    secondaryColor: String;

    theme: Theme;
    fontSize: Number;

    user: User;
    libras: Boolean;
    textToSound: Boolean;
    language:Language;

    constructor(id: Number, notifications: Boolean, primaryColor: String, secondaryColor: String, theme: Theme, fontSize: Number, user: User, libras: Boolean, textToSound: Boolean, language:Language) {
        this.id = id;
        this.notifications = notifications;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.theme = theme;
        this.fontSize = fontSize;
        this.user = user;
        this.language = language;
        this.libras = libras;
        this.textToSound = textToSound;
    }
    
}
