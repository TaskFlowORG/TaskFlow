 
import { Destination } from "../destination/Destination";
import { Archive } from "@/models/others/Archive";
import { OtherUser } from "@/models/user/user/OtherUser";

export class Message {
    constructor(
        public id: number,
        public value: string,
        public sender: OtherUser,
        public dateCreate: Date,
        public destinations: Destination[],
        public dateUpdate?: Date,
        public annex?: Archive
    ) {}


    equals?(obj: any): boolean {
        return obj instanceof Message && obj.id === this.id;
    }
}

