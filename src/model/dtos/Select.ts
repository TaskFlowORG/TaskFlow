import { AllArgsConstructor } from "@/utils";
import { Property } from "../properties/Property";
import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Project } from "../Project";
import { Page } from "../pages/Page";
import { Option } from "./Option";

@AllArgsConstructor
export class Select extends Property {
    options!: Option[];
    constructor(
        id: number,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        page?: Page[],
        project?: Project,
        options: Option[] = [],
    ) {
        super(id, name, visible, obligatory, type, page, project);
    }

    equals(obj: any): boolean {
        return obj instanceof Select && obj.id === this.id;
    }
}
