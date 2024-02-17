import { AllArgsConstructor } from "@/utils";
import { Property } from "../properties/Property";
import { Value } from "../values/Value";

@AllArgsConstructor
export class TaskValue {
    id!: number;
    property!: Property;
    value!: Value;

    constructor(id: number, property: Property, value: Value) {
    }

    equals(obj: any): boolean {
        if (obj instanceof TaskValue) {
            return this.id === obj.id;
        }
        return false;
    }   
}
