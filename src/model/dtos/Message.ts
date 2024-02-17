import { AllArgsConstructor } from "@/utils";
import { User } from "../User";
import { Destination } from "./Destination";
import { Archive } from "../Archive";

@AllArgsConstructor
export class Message {
    id!: number;
    value!: string;
    sender!: User;
    dateCreate!: Date;
    dateUpdate?: Date;
    destination?: Destination[];
    annex?: Archive;

    constructor(
        id: number,
        value: string,
        sender: User,
        dateCreate: Date,
        dateUpdate: Date,
        destination: Destination[],
        annex: Archive
    ) {}

    equals(obj: any): boolean {
        return obj instanceof Message && obj.id === this.id;
    }
}
