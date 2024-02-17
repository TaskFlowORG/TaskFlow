import { Value } from "./Value";

export class ArchiveValued extends Value{
    archive: string;

    constructor(id: number, value: string){
        super(id, value);
        this.archive = value;
    }

    getValue(): any {
        return this.value;
    }

}