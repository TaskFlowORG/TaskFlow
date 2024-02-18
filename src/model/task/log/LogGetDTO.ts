import { Action } from "@/model/enums/Action";
import { SimpleUserGet } from "@/model/user/user/SimpleUserGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class LogGet {
    id!: number;         
    description!: string;
    action!: Action;     
    user!: SimpleUserGet;      
    datetime!: Date;     

    constructor(id: number, description: string, action: Action, user: SimpleUserGet, datetime: Date) {}

    equals = (obj: any) => {
        return obj instanceof LogGet && obj.id === this.id;
    }

}
