import { AllArgsConstructor } from "@/utils";
import { DestinationId } from "./DestinationId";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";

@AllArgsConstructor
export class DestinationGet {

    private id!: DestinationId;
    private user!: SimpleUserGet;
    private visualized!: boolean;

    constructor(id: DestinationId, user: SimpleUserGet, visualized: boolean) {}

    equals(obj: any): boolean {
        if (obj instanceof DestinationGet) {
            return this.id.equals(obj.id);
        }
        return false;
    }
}
