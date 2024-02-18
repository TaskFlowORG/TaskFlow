import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { PageGet } from "@/model/page/page/PageGetDTO";
import { ProjectGet } from "@/model/project/project/ProjectGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class Property {
    id!: number;
    name!: string;
    visible!: boolean;
    obligatory!: boolean;
    type!: TypeOfProperty;
    pages!: PageGet[];
    project?: ProjectGet;

    constructor(
        id: number,
        name: string,
        visible: boolean,
        obligatory: boolean,
        type: TypeOfProperty,
        pages: PageGet[],
        project: ProjectGet
    ) {}
    equals(obj: any): boolean {
        if (obj instanceof Property) {
            return this.id === obj.id;
        }
        return false;
    }
}
