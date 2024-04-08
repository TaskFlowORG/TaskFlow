import { Archive } from "@/models/others/Archive";
export class    OtherUser {
    

    constructor(
        public id: number = 0,
        public username: string = "",
        public name: string = "",
        public surname: string = "",
        public picture?: Archive,
        public mail: string = "",
        public description: string = "",
        public points: number = 0,
        ){
            
        }
    
    //Adicionar a foto denovo depois


    equals = (obj: any) => {
        return obj instanceof OtherUser && obj.username === this.username;
    }
}
