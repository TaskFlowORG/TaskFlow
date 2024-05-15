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
<<<<<<< HEAD
        public points: number,       
        public authenticate : boolean,                
=======
        public points: number,
        public authenticate: boolean,       
                
>>>>>>> c2954940089a6368ef1011077a58b7939a8cffb5
        public configuration: Configuration,                  
        public permissions: Permission[],       
        public notifications: Notification[],  
    ) { }
    equals = (obj: any) => {
        return obj instanceof User && obj.username === this.username;
    }
}
