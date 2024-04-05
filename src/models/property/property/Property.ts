import { TypeOfProperty } from "@/models";
 

export class Property {

    constructor(
        public id: number,
        public name: string,
        public type: TypeOfProperty,
        public visible: boolean,
        public obligatory: boolean
    ) { }
    equals(obj: any): boolean {
        if (obj instanceof Property) {
            return this.id === obj.id;
        }
        return false;
    }
}
