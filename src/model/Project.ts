import { Group } from "./Group";
import { Property } from "./Properties/Property";
import { User } from "./User";
import { Page } from "./pages/Page";
import { Permission } from "./Permission";

export class Project {

    id: number;
    name: string;
    description: string;
    deadline: Date;
    visualizedAt:Date;
    picture: string;
    owner: User;
    pages: Array<Page>;
    properties: Array<Property>; 
    percentage: number;


    constructor(id: number, name: string, description: string, deadline: Date, visualizedAt:Date, picture: string, owner: User, pages: Array<Page>, properties: Array<Property>, percentage: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.visualizedAt = visualizedAt;
        this.picture = picture;
        this.owner = owner;
        this.pages = pages;
        this.properties = properties;
        this.percentage = percentage;
    }
    
}