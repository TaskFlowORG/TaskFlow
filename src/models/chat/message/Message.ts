import { AllArgsConstructor } from "@/utils";
import { DestinationGet } from "../destination/DestinationGetDTO";
import { UserGet } from "@/models/user/user/UserGetDTO";

@AllArgsConstructor
export class Message {
    id!: number;
    value!: string;
    sender!: UserGet;
    destinations?: DestinationGet[];

    constructor(id: number, value: string, sender: UserGet,  destinations: DestinationGet[]) {}


    equals(obj: any): boolean {
        return obj instanceof Message && obj.id === this.id;
    }
}
