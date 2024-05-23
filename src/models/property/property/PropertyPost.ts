import { Page, Project } from "@/models";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
 


export class PropertyPost {

    constructor(
        public name: string,
        public visible: boolean,
        public obligatory: boolean,
        public type: TypeOfProperty,
        public pages: Page[],
        public project: Project | undefined
    ) { }

}
