import { User } from "../user/User";
import { Permission } from "@/models/project/permission/Permission";

export class GroupPost {

    constructor(
        public name: string,
        public description: string,
        public permissions: Permission[],
        public users: User[],
    ) { }
}