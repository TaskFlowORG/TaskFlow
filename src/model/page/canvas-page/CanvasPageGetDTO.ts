import { AllArgsConstructor } from "@/utils";
import { PageGet } from "../page/PageGetDTO";
import { Archive } from "@/model/others/Archive";
import { TypeOfPage } from "@/model/enums/TypeOfPage";
import { PropertyGet } from "@/model/property/property/PropertyGetDTO";
import { TaskCanvasGet } from "@/model/relations/task-canvas/TaskCanvasGetDTO";

@AllArgsConstructor
export class CanvasPageGet extends PageGet {

    draw!:Archive;

    constructor(id:number, name:string, type:TypeOfPage, properties:PropertyGet[], tasks:TaskCanvasGet[], draw:Archive){
        super(id, name, type, properties, tasks);
    }

    equals = (obj:any) => {
        if(obj instanceof CanvasPageGet){
            return obj.id === this.id;
        }
        return false;
    }
}
