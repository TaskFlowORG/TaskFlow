 
import { OtherUser } from "../user/user/OtherUser";
import { Value } from "./Value";
export class UserValued extends Value{

    constructor(public id:number, public users: OtherUser[]){
        super(id, users);
    }


}
