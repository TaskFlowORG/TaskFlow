import { AllArgsConstructor } from "@/utils";
import { Property } from "../property/Property";
import { ProjectGet } from "@/models/project/project/ProjectGetDTO";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { PageGet } from "@/models/page/page/PageGetDTO";

// @AllArgsConstructor
export class Limited extends Property {
    maximum!: number;

    constructor(
        id: number | undefined,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        pages: PageGet[],
        project: ProjectGet | undefined,
        maximum: number) {
        super(id, name, visible, obligatory, type, pages, project);
        this.maximum=maximum
    }


    equals(obj: any) {
        if (obj instanceof Limited) {
            return this.id === obj.id;
        }
        return false;
    }
}
