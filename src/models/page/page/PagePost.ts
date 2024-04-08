
import { TypeOfPage } from "@/models/enums/TypeOfPage";
import { Project } from "@/models/project/project/Project";
 
export class PagePost {


    constructor(
        public name: string, 
        public type: TypeOfPage, 
        public project: Project) {
        
    }
}
