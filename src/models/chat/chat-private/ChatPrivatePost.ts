import { OtherUser } from "@/models/user/user/OtherUser";
import { User } from "@/models/user/user/User";

export class ChatPrivatePost {
    
    constructor(public users: OtherUser[]) {}
    getName = () => {
        return this.users[0].name + " " + this.users[0].surname;
    }
}