import { AllArgsConstructor } from "@/utils";
import { PropertyGet } from "../property/PropertyGetDTO";
import { Option } from "@/model/values/Option";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";

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
