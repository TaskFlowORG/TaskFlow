import { Value } from "./Value";

export class TextValued extends Value{
    value: string;

    constructor(id: number, value: string){
        super(id);
        this.value = value;
    }

    getValue(): any {
        return this.value;
    }

}