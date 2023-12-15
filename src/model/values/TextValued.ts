import { Value } from "./Value";

export class TextValued extends Value{
    text: string;

    constructor(id: number, value: string){
        super(id, value);
        this.text = value;
    }

    getValue(): any {
        return this.text;
    }

}