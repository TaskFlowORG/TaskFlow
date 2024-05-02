import { Action } from "@/models/enums/Action";
import { PropertyValue } from "@/models/relations/property-value/PropertyValue";
import { OtherUser } from "@/models/user/user/OtherUser";

export class Log {

    constructor(
        public id: number,
        public value: PropertyValue,
        public action: Action,
        public user: OtherUser,
        public datetime: Date) { }

    equals = (obj: any) => {
        return obj instanceof Log && obj.id === this.id;
    }

}
