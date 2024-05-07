 
import { Value } from "./Value";
import { Archive } from "../others/Archive";


export class ArchiveValued extends Value{
    constructor( public archive?:Archive | null,public id?:number){
        super(archive,id);
    }

}
