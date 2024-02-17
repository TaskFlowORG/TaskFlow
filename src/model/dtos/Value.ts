import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export abstract class Value {
    id!:number;

    constructor(id:number) {}


    abstract getValue():any
    abstract setValue(value:any):void;
}
