export abstract class Value{
    id: Number
    value:any

    constructor(id: Number, value:any){
        this.id = id;
        this.value = value
    }

     getValue():any{
     return this.value   
     };
}
