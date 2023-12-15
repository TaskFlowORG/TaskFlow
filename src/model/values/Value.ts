export abstract class Value{
    id: number
    value:any

    constructor(id: number, value:any){
        this.id = id;
        this.value = value
    }

     getValue():any{
     return this.value   
     };
}
