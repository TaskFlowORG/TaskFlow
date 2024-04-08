import { Action } from "@/models/enums/Action";
import { OtherUser } from "@/models/user/user/OtherUser";

export class Log {

    constructor(
        public id: number,
        public description: string,
        public action: Action,
        public user: OtherUser,
        public datetime: Date) { }

    equals = (obj: any) => {
        return obj instanceof Log && obj.id === this.id;
    }

}
