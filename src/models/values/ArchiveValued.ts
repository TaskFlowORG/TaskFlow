 
import { Value } from "./Value";
import { Archive } from "../others/Archive";

@AllArgsConstructor
export class ArchiveValued extends Value{
    value!: Archive

    constructor(id:number, archive:Archive){
        super(id);
    }

}
