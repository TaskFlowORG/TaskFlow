import { Permission } from "@/models/project/permission/Permission";
import { Archive } from "@/models/others/Archive";

export class SimpleGroup {

    constructor(
        public id: number,
        public name: string,
        public picture: Archive,
        public description: string,
    ) { }


    equals = (obj: any) => {
        return obj instanceof SimpleGroup && obj.id === this.id;
    }
}