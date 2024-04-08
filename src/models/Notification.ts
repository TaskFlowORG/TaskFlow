import { TypeOfNotification } from "./enums/TypeOfNotification";



export class Notification {


    constructor(
        public id: number, 
        public message: string,
        public type: TypeOfNotification, 
        public link: string,  
        public visualized: boolean) {
    }
}
