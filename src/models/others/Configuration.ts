import { Language } from "../enums/Language";
import { Theme } from "../enums/Theme";

export class Configuration {

    constructor(
        public id: number,
        public notifications: boolean,
        public primaryColor: string,
        public secondaryColor: string,
        public theme: Theme,
        public fontSize: number,
        public language: Language,
        public libras: boolean,
        public textToSound: boolean,
        public notificTasks: boolean,
        public notificAtAddMeInAGroup: boolean,
        public notificWhenChangeMyPermission: boolean,
        public notificMyPointsChange: boolean,
        public notificSchedules: boolean,
        public notificDeadlines: boolean,
        public notificChats: boolean,
        public notificComments: boolean,
        public initialPageTasksPerDeadline:boolean,
        public googleCalendar:boolean,
        public isTutorialMade:boolean,
        public showPropertiesName:boolean,
    ) { }


    equals = (obj: any) => {
        return obj instanceof Configuration && obj.id === this.id;
    }

    [key: string]: any;
}