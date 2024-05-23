import { Permission } from "@/models/project/permission/Permission";
import { OtherUser } from "../user/OtherUser";
import { Archive } from "@/models/others/Archive";

export class Group {    

    constructor(
        public id: number,
        public name: string,
        public picture: Archive,
        public description: string,
        public permissions: Permission[],
        public owner: OtherUser,
        public users: OtherUser[]
    ) { }

    equals = (obj: any) => {
        return obj instanceof Group && obj.id === this.id;
    }

}