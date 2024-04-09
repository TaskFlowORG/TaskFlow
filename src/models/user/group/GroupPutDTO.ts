import { Permission } from "@/models/project/permission/Permission";
import { OtherUser } from "../user/OtherUser";

export class GroupPut {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public permissions: Permission[],
        public users: OtherUser[],
    ) { }

    equals = (obj: any) => {
        return obj instanceof GroupPut && obj.id === this.id;
    }
}