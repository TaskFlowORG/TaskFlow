import { TypeOfPage } from "@/model/enums/TypeOfPage";
import { ProjectGet } from "@/model/project/project/ProjectGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class PagePost {
    name!: string;
    type!: TypeOfPage;
    project?: ProjectGet;

    constructor(name: string, type: TypeOfPage, project: ProjectGet) {}
}
