import { AllArgsConstructor } from "@/utils";
import { Permission } from "./Permission";
import { Configuration } from "./Configuration";
import { Archive } from "./Archive";

@AllArgsConstructor
export class User {

    username!: string;
    name!: string;
    surname!: string;
    password!: string;
    address?: string;
    picture?: Archive;
    mail!: string;
    phone?: string;
    description?: string;
    points!: number;
    configuration!: Configuration ; 
    permissions!: Permission[];
    constructor(username: string, name: string, surname: string, password: string, address: string, 
        picture: Archive, mail: string, phone: string, description: string, points: number, 
        configuration: Configuration, permissions: []) {}

    equals = (obj: any) => {
        return obj instanceof User && obj.username === this.username;
    }
}
