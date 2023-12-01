import { Group } from "./Group";
import { User } from "./User";

export class Project {

    id: Number;
    name: String;
    description: String;
    date: Date;
    picture: String;
    groups: Array<Group>;
    owner: User;
    pages: Array<Page>;
    properties: Array<Property>;

    constructor(id: Number, name: String, description: String, date: Date, picture: String, groups: Array<Group>, owner: User, pages: Array<Page>, properties: Array<Property>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.picture = picture;
        this.groups = groups;
        this.owner = owner;
        this.pages = pages;
        this.properties = properties;
    }
    
}