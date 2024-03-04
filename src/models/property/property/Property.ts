import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { PageGet } from "@/models/page/page/PageGetDTO";
import { ProjectGet } from "@/models/project/project/ProjectGetDTO";
import { AllArgsConstructor } from "@/utils";


export class Property {
    id?: number;
    name!: string;
    visible?: boolean;
    obligatory?: boolean;
    type!: TypeOfProperty;
    pages!: PageGet[];
    project?: ProjectGet;

    constructor(
        id: number | undefined,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        pages: PageGet[],
        project: ProjectGet | undefined
    ) {
        this.id = id;
        this.name = name;
        this.visible = visible;
        this.obligatory = obligatory;
        this.type = type;
        this.pages = pages;
        this.project = project;
    }
    equals(obj: any): boolean {
        if (obj instanceof Property) {
            return this.id === obj.id;
        }
        return false;
    }
}
