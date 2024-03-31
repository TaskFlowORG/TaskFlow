import { Group } from "@/models";
import { Archive } from "@/models/others/Archive";
import { PageGet } from "@/models/page/page/PageGetDTO";
import { PropertyGet } from "@/models/property/property/PropertyGetDTO";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class ProjectSimple {
    id!:number;
    name?:string;
    description?:string;
    picture?:Archive;
    progress!:number;
    groups?:Group[];
    owner?:SimpleUserGet;

    constructor(
        id:number,
        name:string,
        description:string,
        picture:Archive,
        progress:number,
        groups:Group[],
    ) { }
    
    equals = (obj: any) => {
        return obj instanceof ProjectSimple && obj.id === this.id;
    }
}