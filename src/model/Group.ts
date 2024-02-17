import { Permission } from "./Permission";
import { User } from "./User";

export class Group {

    id: number;
    name: string;
    picture: string;
    description: string;
    users: Array<User>;
    permissions: Array<Permission>

    constructor(id: number, name: string, picture: string, description: string, users: Array<User>, permissions:Array<Permission>) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.users = users;
        this.permissions = permissions;

    }



}

