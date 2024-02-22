
import { TypeOfPage } from "@/models/enums/TypeOfPage";
import { ProjectGet } from "@/models/project/project/ProjectGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class PagePost {
    name!: string;
    type!: TypeOfPage;
    project?: ProjectGet;

    constructor(name: string, type: TypeOfPage, project: ProjectGet) {
        
    }
}
