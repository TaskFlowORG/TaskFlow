import { Archive } from "@/models/others/Archive";
import { Configuration } from "@/models/others/Configuration";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class    SimpleUserGet {

    username!: string;
    name!: string;
    surname!: string;
    address?: string;
    picture?: Archive;
    mail!: string;
    phone?: string;
    description?: string;
    points!: number;
    configuration!: Configuration ; 
    
    constructor(username: string, name: string, surname: string, address: string, 
        picture: Archive, mail: string, phone: string, description: string, points: number, 
        configuration: Configuration) {}

    equals = (obj: any) => {
        return obj instanceof SimpleUserGet && obj.username === this.username;
    }
}
