 
import { Project } from "@/models";
import { PropertyPost } from "../property/PropertyPost";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { Page } from "@/models/page/page/Page";


export class DatePost extends PropertyPost {

        constructor(
        public name: string,
        public type: TypeOfProperty,
        public visible: boolean,
        public obligatory: boolean,
        public canBePass : boolean,
        public includeHours: boolean,
        public project: Project | undefined,
        public pages: Page[]
    ) {
        super( name, visible, obligatory, type, pages, project);
    }
}