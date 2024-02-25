import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export abstract class Value {
    id!:number;
    value:any;

    constructor(id:number) {}
}
