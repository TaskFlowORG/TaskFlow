import { Page, Project } from "@/models";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
 


export class PropertyPost {

    constructor(
        public id: number,
        public name: string,
        public visible: boolean,
        public obligatory: boolean,
        public type: TypeOfProperty,
        public pages: Page[],
        public project: Project | undefined
    ) { }
    equals(obj: any): boolean {
        if (obj instanceof PropertyPost) {
            return this.id === obj.id;
        }
        return false;
    }
}
