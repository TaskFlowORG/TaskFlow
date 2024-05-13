import { Notification } from "@/models/Notification";
import { Archive } from "@/models/others/Archive";
import { Configuration } from "@/models/others/Configuration";
import { Permission } from "@/models/project/permission/Permission";



export class User {

    //Adicionar a foto de novo depois
    constructor(
        public id: number,
        public username: string,                  
        public name: string,                  
        public surname: string,                   
        public address: string,                   
        public picture: Archive,                  
        public mail: string,                  
        public phone: string,                 
        public description: string,                   
        public points: number,                    
        public configuration: Configuration,                  
        public permissions: Permission[],       
        public notifications: Notification[],  
    ) { }
    equals = (obj: any) => {
        return obj instanceof User && obj.username === this.username;
    }
}
