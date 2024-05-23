 
import { OtherUser } from "../user/user/OtherUser";
import { Value } from "./Value";
export class UserValued extends Value{

    constructor( public users: OtherUser[],public id?:number,){
        super(users,id);
    }


}
