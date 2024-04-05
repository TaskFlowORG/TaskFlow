
import { Project } from "@/models/project/project/Project";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { Option } from "@/models/values/Option";
import { Page } from "@/models/page/page/Page";
import { PropertyPost } from "../property/PropertyPost";


export class SelectPost extends PropertyPost {
        constructor(
            public id: number,
            public name: string,
            public type: TypeOfProperty,
            public visible: boolean,
            public obligatory: boolean,
            public options: Option[],
           public project: Project | undefined,
           public pages: Page[]
        ) {
            super(id, name, visible, obligatory, type, pages, project);
        }

    equals(obj: any): boolean {
        return obj instanceof SelectPost && obj.id === this.id;
    }
}
