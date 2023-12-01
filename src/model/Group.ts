import { User } from "./User";

export class Group {


    id: Number;
    name: String;
    picture: String;
    description: String;
    users: Array<User>;

    constructor(id: Number, name: String, picture: String, description: String, users: Array<User>) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.users = users;
    }

}