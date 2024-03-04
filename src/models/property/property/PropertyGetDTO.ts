import { TypeOfProperty } from "@/models";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class PropertyGet {
    id!: number;
    name!: string;
    visible!: boolean;
    obligatory!: boolean;
    type!: TypeOfProperty;

    constructor(id: number, name: string, visible: boolean, obligatory: boolean, type: TypeOfProperty) { }

    equals(obj: any): boolean {
        if (obj instanceof PropertyGet) {
            return this.id === obj.id;
        }
        return false;
    }
}
