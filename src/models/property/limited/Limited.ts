 
import { Property } from "@/models";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";


export class Limited extends Property {

    constructor(
        public id: number,
        public name: string,
        public type: TypeOfProperty,
        public visible: boolean,
        public obligatory: boolean,
        public maximum: number,
    ) {
        super(id, name, type, visible, obligatory);
    }


    equals(obj: any) {
        if (obj instanceof Limited) {
            return this.id === obj.id;
        }
        return false;
    }
}
