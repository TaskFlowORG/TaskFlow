import { Group } from "./Group";
import { Property } from "./Properties/Property";
import { User } from "./User";
import { Page } from "./pages/Page";
import { Permission } from "./Permission";

export class Project {

    id: Number;
    name: String;

    description: String;
    deadline: Date;
    visualizedAt:Date;
    owner:User;
    picture: String;
    groups: Array<Group>;
    owner: User;
    pages: Array<Page>;
    properties: Array<Property>; 


    constructor(id: Number, name: String, description: String, deadline: Date, visualizedAt:Date, picture: String, groups: Array<Group>, owner: User, pages: Array<Page>, properties: Array<Property>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.visualizedAt = visualizedAt;
        this.picture = picture;
        this.groups = groups;
        this.owner = owner;
        this.pages = pages;
        this.properties = properties;
    }
    
}