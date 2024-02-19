
import { PropertyGet } from "@/models/property/property/PropertyGetDTO";
import { Value } from "@/models/values/Value";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class TaskValueGet {
    id!: number;
    property!: PropertyGet;
    value!: Value;

    constructor(id: number, property: PropertyGet, value: Value) {
    }

    equals(obj: any): boolean {
        if (obj instanceof TaskValueGet) {
            return this.id === obj.id;
        }
        return false;
    }   
}
