import { Archive } from "@/models/others/Archive";
import { PageGet } from "@/models/page/page/PageGetDTO";
import { PropertyGet } from "@/models/property/property/PropertyGetDTO";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";
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