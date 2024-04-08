import { AllArgsConstructor } from "@/utils";
import { PropertyGet } from "../property/PropertyGetDTO";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";


export class LimitedGet extends PropertyGet {
    constructor(
        public id: number,              
        public name: string,            
        public visible: boolean,        
        public obligatory: boolean,     
        public type: TypeOfProperty,     
        public maximum: number = 0) {
        super(id, name, visible, obligatory, type);
    }


    equals(obj: any) {
        if (obj instanceof LimitedGet) {
            return this.id === obj.id;
        }
        return false;
    }
}
