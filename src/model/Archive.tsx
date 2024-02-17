export class Archive {
   id: number;
    name: string;
    type: string;
    data: string;

    constructor(id: number, name: string, type: string, data: string){
        this.id = id;
        this.name = name;
        this.type = type;
        this.data = data;
    }
}