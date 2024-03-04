import { AllArgsConstructor } from "@/utils";
import { Property } from "../property/Property";
import { TypeOfProperty } from "@/models/enums/TypeOfProperty";
import { ProjectGet } from "@/models/project/project/ProjectGetDTO";
import { PageGet } from "@/models/page/page/PageGetDTO";


export class Date extends Property {
    canBePass!: boolean;
    includesHours!: boolean;
    deadline!: boolean;
    scheduling!: boolean;
    color!: string;

    constructor(
        id: number | undefined,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        page: PageGet[] ,
        project: ProjectGet | undefined,
        canBePass: boolean,
        includesHours: boolean,
        deadline: boolean,
        scheduling: boolean,
        color: string
    ) {
        super(id, name, visible, obligatory, type, page, project);
        this.canBePass = canBePass;
        this.includesHours = includesHours;
        this.deadline = deadline;
        this.scheduling = scheduling;
        this.color = color;
    }

    equals(obj: any): boolean {
        return obj instanceof Date && obj.id === this.id;
    }
}