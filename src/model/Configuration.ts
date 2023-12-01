import { User } from "./User";

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

    constructor(id: Number, notifications: Boolean, primaryColor: String, secondaryColor: String, theme: Theme, fontSize: Number, user: User, libras: Boolean, textToSound: Boolean) {
        this.id = id;
        this.notifications = notifications;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.theme = theme;
        this.fontSize = fontSize;
        this.user = user;
        this.libras = libras;
        this.textToSound = textToSound;
    }
    
}
