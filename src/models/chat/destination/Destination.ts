
import { DestinationId } from "./DestinationId";
import { OtherUser } from "@/models/user/user/OtherUser";

export class Destination {
    constructor(
        public id: DestinationId, 
        public user: OtherUser, 
        public visualized: boolean
    ) {}

    equals(obj: any): boolean {
        if (obj instanceof Destination) {
            return this.id.equals(obj.id);
        }
        return false;
    }
}
