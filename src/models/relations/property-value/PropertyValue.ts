
import { Property } from "@/models";
import { Value } from "@/models/values/Value";

export class PropertyValue {

    constructor(
        public id: number,
        public property: Property,
        public value: Value,
    ) { }

    equals(obj: any): boolean {
        if (obj instanceof PropertyValue) {
            return this.id === obj.id;
        }
        return false;
    }   
}
