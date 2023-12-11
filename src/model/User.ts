import { Configuration } from "./Configuration";
import { Group } from "./Group";
import { Permission } from "./Permission";
import { Project } from "./Project";

export class User {
    id: Number;
    name: String;
    surname: String;
    username: String;
    password: String;
    address: String;
    picture: String;
    mail: String;
    phone: String;
    description : String;
    points: Number;
    configuration: Configuration;
    permissions: Array<Permission>;

    constructor(id: Number, name: String, surname: String, username: String, password: String, address: String, picture: String, mail: String, phone: String, description: String, points: Number, configuration: Configuration, permissions: Array<Permission>) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.address = address;
        this.picture = picture;
        this.mail = mail;
        this.phone = phone;
        this.description = description;
        this.points = points;
        this.configuration = configuration;
        this.permissions = permissions;
    }
    
}