import { AllArgsConstructor } from "@/utils";
import { Property } from "./Property";
import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Page } from "../pages/Page";
import { Project } from "../Project";

@AllArgsConstructor
export class Date extends Property {
    canBePass!: boolean;
    includesHours!: boolean;
    deadline!: boolean;
    scheduling!: boolean;
    color!: string;

    constructor(
        id: number,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        page?: Page[],
        project?: Project,
        canBePass?: boolean,
        includesHours?: boolean,
        deadline?: boolean,
        scheduling?: boolean,
        color?: string
    ) {
        super(id, name, visible, obligatory, type, page, project);
    }

    equals(obj: any): boolean {
        return obj instanceof Date && obj.id === this.id;
    }
}