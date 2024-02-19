import { AllArgsConstructor } from "@/utils";
import { Property } from "../property/Property";
import { ProjectGet } from "@/models/project/project/ProjectGetDTO";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { Option } from "@/models/values/Option";
import { PageGet } from "@/models/page/page/PageGetDTO";

@AllArgsConstructor
export class Select extends Property {
    options!: Option[];
    constructor(
        id: number,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        page: PageGet[],
        project: ProjectGet,
        options: Option[] = [],
    ) {
        super(id, name, visible, obligatory, type, page, project);
    }

    equals(obj: any): boolean {
        return obj instanceof Select && obj.id === this.id;
    }
}
