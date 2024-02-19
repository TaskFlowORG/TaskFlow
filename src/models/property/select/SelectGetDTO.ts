import { AllArgsConstructor } from "@/utils";
import { PropertyGet } from "../property/PropertyGetDTO";
import { Option } from "@/models/values/Option";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";

@AllArgsConstructor
export class SelectGet extends PropertyGet {
    options!: Option[];
    constructor(
        id: number,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        options: Option[] = [],
    ) {
        super(id, name, visible, obligatory, type);
    }

    equals(obj: any): boolean {
        return obj instanceof SelectGet && obj.id === this.id;
    }
}
