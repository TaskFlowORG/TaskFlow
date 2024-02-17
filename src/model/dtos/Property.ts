import { AllArgsConstructor } from "@/utils";
import { Page } from "../pages/Page";
import { TypeOfProperty } from "../enums/TypeOfProperty";
import { Project } from "../Project";

@AllArgsConstructor
export class Property {
    id!: number;
    name!: string;
    visible!: boolean;
    obligatory!: boolean;
    type!: TypeOfProperty;
    pages!: Page[];
    project?: Project;

    constructor(id: number, name: string, visible: boolean, obligatory: boolean, type: TypeOfProperty, pages?: Page[], project?: Project) { }

    equals(obj: any): boolean {
        if (obj instanceof Property) {
            return this.id === obj.id;
        }
        return false;
    }
}
