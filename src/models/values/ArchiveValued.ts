 
import { Value } from "./Value";
import { Archive } from "../others/Archive";


export class ArchiveValued extends Value{
    constructor(public id:number, public archive:Archive){
        super(id, archive);
    }

}
