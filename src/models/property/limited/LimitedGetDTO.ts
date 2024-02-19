import { AllArgsConstructor } from "@/utils";
import { PropertyGet } from "../property/PropertyGetDTO";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";

@AllArgsConstructor
export class LimitedGet extends PropertyGet {
    maximum!: number;

    constructor(
        id: number,              
        name: string,            
        visible: boolean,        
        obligatory: boolean,     
        type: TypeOfProperty,     
        maximum: number = 0) {
        super(id, name, visible, obligatory, type);
    }


    equals(obj: any) {
        if (obj instanceof LimitedGet) {
            return this.id === obj.id;
        }
        return false;
    }
}
