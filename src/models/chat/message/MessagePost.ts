 
import { Destination } from "../destination/Destination";
import { User } from "@/models/user/user/User";

export class MessagePost {
    constructor(
        public id: number, 
        public value: string, 
        public sender: User, 
        public destinations?: Destination[]
    ) {}


    equals(obj: any): boolean {
        return obj instanceof MessagePost && obj.id === this.id;
    }
}
