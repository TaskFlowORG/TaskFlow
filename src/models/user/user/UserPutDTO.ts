import { Notification } from "@/models/Notification";
import { Configuration } from "@/models/others/Configuration";
import { Permission } from "@/models/project/permission/Permission";

export class UserPut {



    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public mail: string,
        public phone: string,
        public description: string,
        public configuration: Configuration,
        public permissions: Permission[],
        public authenticate: boolean,    
        public notifications: Notification[]
        ) {}

    equals = (obj: any) => {
        return obj instanceof UserPut && obj.id === this.id;
    }
}
