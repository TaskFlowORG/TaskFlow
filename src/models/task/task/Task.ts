import { PropertyValue } from "@/models/relations/property-value/PropertyValue";
import { Log } from "../log/Log";
import { Message } from "@/models/chat/message/Message";


export class Task {


    constructor(
        public id: number,
        public name: string,
        public deleted: boolean,
        public completed: boolean,
        public waitingRevision: boolean,
        public properties: PropertyValue[],
        public logs: Log[],
        public dependencies:Task[],
        public comments: Message[]) { }


    equals(obj: any): boolean {
        if (obj instanceof Task) {
            return obj.id === this.id;
        }
        return false;
    }
}
