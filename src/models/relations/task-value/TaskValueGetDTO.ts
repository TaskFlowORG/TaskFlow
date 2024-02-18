import { Property } from "@/model/property/property/Property";
import { PropertyGet } from "@/model/property/property/PropertyGetDTO";
import { Value } from "@/model/values/Value";
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
