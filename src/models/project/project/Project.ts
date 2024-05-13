import { Message } from "@/models/chat/message/Message";
import { Archive } from "@/models/others/Archive";
import { Page } from "@/models/page/page/Page";
import { Property } from "@/models/property/property/Property";
import { PropertyValue } from "@/models/relations/property-value/PropertyValue";
import { Log } from "@/models/task/log/Log";
import { OtherUser } from "@/models/user/user/OtherUser";
 

export class Project {

    constructor(
        public id: number,
        public name: string | undefined,
        public description: string | undefined,
        public picture: Archive,
        public visualizedAt: Date,
        public owner: OtherUser,
        public pages: Page[],
        public properties: Property[],
        public comments: Message[],
        public values: PropertyValue[],
        public logs:Log[],
        public revision: boolean
    ) {
    }
    
    equals = (obj: any) => {
        return obj instanceof Project && obj.id === this.id;
    }
}