import { Archive } from "@/model/others/Archive";
import { PageGet } from "@/model/page/page/PageGetDTO";
import { PropertyGet } from "@/model/property/property/PropertyGetDTO";
import { SimpleUserGet } from "@/model/user/user/SimpleUserGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class ProjectGet {
    id!: number;
    name?: string;
    description?: string;
    picture?: Archive;
    deadline?: Date;
    visualizedAt!: Date;
    owner!: SimpleUserGet;
    pages!: PageGet[];
    properties!: PropertyGet[];

    constructor(
        id: number,
        name: string,
        description: string,
        picture: Archive,
        deadline: Date,
        visualizedAt: Date,
        owner: SimpleUserGet,
        pages: PageGet[],
        properties: PropertyGet[]
    ) { }
    
    equals = (obj: any) => {
        return obj instanceof ProjectGet && obj.id === this.id;
    }
}