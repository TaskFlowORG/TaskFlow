import { AllArgsConstructor } from "@/utils";
import { PropertyGet } from "../property/PropertyGetDTO";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";

@AllArgsConstructor
export class DateGet extends PropertyGet {
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
        canBePass: boolean,
        includesHours: boolean,
        deadline: boolean,
        scheduling: boolean,
        color: string
    ) {
        super(id, name, visible, obligatory, type);
    }

    equals(obj: any): boolean {
        return obj instanceof DateGet && obj.id === this.id;
    }
}