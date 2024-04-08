 
import { Property,  } from "../property/Property";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";

export class Date extends Property {
    
    constructor(
        public id: number,
        public name: string,
        public type: TypeOfProperty,
        public visible: boolean,
        public obligatory: boolean,
        public canBePass: boolean,
        public includesHours: boolean,
        public deadline: boolean,
        public scheduling: boolean,
        public color: string
        
    ) {
        super(id, name, type, visible, obligatory);
    }
    equals(obj: any): boolean {
        return obj instanceof Date && obj.id === this.id;
    }
}