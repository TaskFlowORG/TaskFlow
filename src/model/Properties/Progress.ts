import { TypeOfProgress } from "../enums/TypeOfProgress";

export class Progress {
    typeOfProgress : TypeOfProgress;
    constructor(typeOfProgress:TypeOfProgress){
        this.typeOfProgress=typeOfProgress;
    }
}
