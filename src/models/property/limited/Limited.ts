import { AllArgsConstructor } from "@/utils";
import { Property } from "../property/Property";
import { ProjectGet } from "@/model/project/project/ProjectGetDTO";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { PageGet } from "@/model/page/page/PageGetDTO";

@AllArgsConstructor
export class Limited extends Property {
    maximum!: number;

    constructor(
        id: number,              
        name: string,            
        visible: boolean,        
        obligatory: boolean,     
        type: TypeOfProperty,    
        page: PageGet[],           
        project: ProjectGet,       
        maximum: number) {
        super(id, name, visible, obligatory, type, page, project);
    }


    equals(obj: any) {
        if (obj instanceof Limited) {
            return this.id === obj.id;
        }
        return false;
    }
}
