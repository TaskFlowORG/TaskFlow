 
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { Page } from "@/models/page/page/Page";
import { Project } from "@/models/project/project/Project";
import { PropertyPost } from "../property/PropertyPost";

export class LimitedPost extends PropertyPost {

    constructor(
        public id: number,
        public name: string,
        public type: TypeOfProperty,
        public visible: boolean,
        public obligatory: boolean,
        public maximum: number,
        public project: Project | undefined,
        public pages: Page[]
    ) {
        super(id, name, visible, obligatory, type, pages, project);
    }

    equals(obj: any) {
        if (obj instanceof LimitedPost) {
            return this.id === obj.id;
        }
        return false;
    }
}
