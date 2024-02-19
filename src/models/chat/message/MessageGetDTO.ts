import { AllArgsConstructor } from "@/utils";
import { DestinationGet } from "../destination/DestinationGetDTO";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";
import { Archive } from "@/models/others/Archive";

@AllArgsConstructor
export class MessageGet {
    id!: number;                   
    value!: string;                
    sender!: SimpleUserGet;        
    dateCreate!: Date;             
    dateUpdate?: Date;             
    destinations?: DestinationGet[];
    annex?: Archive;               

    constructor(id: number, value: string, sender: SimpleUserGet, dateCreate: Date, 
        dateUpdate: Date, destinations: DestinationGet[], annex: Archive) {}


    equals(obj: any): boolean {
        return obj instanceof MessageGet && obj.id === this.id;
    }
}

