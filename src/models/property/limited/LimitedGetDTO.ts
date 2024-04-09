import { Property } from '@/models';

import { TypeOfProperty } from "@/models/enums/TypeOfProperty";


export class LimitedGet extends Property {
    constructor(
        public id: number,              
        public name: string,            
        public visible: boolean,        
        public obligatory: boolean,     
        public type: TypeOfProperty,     
        public maximum: number = 0) {
        super(id, name, type, visible, obligatory)
    }


    equals(obj: any) {
        if (obj instanceof LimitedGet) {
            return this.id === obj.id;
        }
        return false;
    }
}
