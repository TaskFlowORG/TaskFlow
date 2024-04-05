 
import { Project } from "next/dist/build/swc";
import { PropertyPost } from "../property/PropertyPost";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { Page } from "@/models/page/page/Page";


export class DatePost extends PropertyPost {

    constructor(
        public id: number,
        public name: string,
        public type: TypeOfProperty,
        public visible: boolean,
        public obligatory: boolean,
        public project: Project | undefined,
        public pages: Page[]
    ) {
        super(id, name, visible, obligatory, type, pages, project);
    }

    equals(obj: any): boolean {
        return obj instanceof DatePost && obj.id === this.id;
    }
}