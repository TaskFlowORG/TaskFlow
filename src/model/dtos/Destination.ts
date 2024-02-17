import { AllArgsConstructor } from "@/utils";
import { DestinationId } from "../ids/DestinationId";
import { User } from "../User";
import { Message } from "react-hook-form";

@AllArgsConstructor
export class Destination {
    private id!: DestinationId;
    private user!: User;
    private message!: Message;
    private visualized!: boolean;

    constructor(id: DestinationId, user: User, message: Message, visualized: boolean) {}

    equals(obj: any): boolean {
        if (obj instanceof Destination) {
            return this.id.equals(obj.id);
        }
        return false;
    }
}
