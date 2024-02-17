import { AllArgsConstructor } from "@/utils";
import { User } from "../User";
import { Action } from "../enums/Action";

@AllArgsConstructor
export class Log {
    id!: number;
    description!: string;
    action!: Action;
    user!: User;
    datetime!: Date;

    constructor(id: number, description: string, action: Action, user: User, datetime: Date) {}

    equals = (obj: any) => {
        return obj instanceof Log && obj.id === this.id;
    }

}
