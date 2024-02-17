import { AllArgsConstructor } from "@/utils";
import { Property } from "./Property"
import { Project } from "../Project";
import { Page } from "../pages/Page";
import { TypeOfProperty } from "../enums/TypeOfProperty";

@AllArgsConstructor
class Limited extends Property {
    maximum!: number;

    constructor(
        id: number,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        page?: Page[],
        project?: Project,
        maximum: number = 0) {
        super(id, name, visible, obligatory, type, page, project);
    }


    equals(obj: any) {
        if (obj instanceof Limited) {
            return this.id === obj.id;
        }
        return false;
    }
}
