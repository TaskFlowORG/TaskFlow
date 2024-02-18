import { AllArgsConstructor } from "@/utils";
import { UserGet } from "@/model/user/user/UserGetDTO";
import { Archive } from "@/model/others/Archive";
import { DestinationGet } from "../destination/DestinationGetDTO";

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
