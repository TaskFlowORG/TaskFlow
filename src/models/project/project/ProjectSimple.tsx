import { Group, OtherUser } from "@/models";
import { Archive } from "@/models/others/Archive";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
 

export class ProjectSimple {


    constructor(
        public id: number,
        public name: string,
        public description: string,
        public picture: Archive,
        public progress: number,
        public groups: SimpleGroup[],
        public owner: OtherUser,
        public qttyPages: number,
        public qttyProperties: number,
        public visualizedAt:Date
    ) {}
    
    equals = (obj: any) => {
        return obj instanceof ProjectSimple && obj.id === this.id;
    }
}