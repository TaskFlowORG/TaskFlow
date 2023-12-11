export abstract class Value{
    id: Number

    constructor(id: Number){
        this.id = id;
    }

    abstract getValue():any;
}
