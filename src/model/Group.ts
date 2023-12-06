import { Permission } from "./Permission";
import { User } from "./User";

export class Group {


    id: Number;
    name: String;
    picture: String;
    description: String;
    users: Array<User>;
    permissions: Array<Permission>

    constructor(id: Number, name: String, picture: String, description: String, users: Array<User>, permissions:Array<Permission>) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.users = users;
        this.permissions = permissions;

    }



}