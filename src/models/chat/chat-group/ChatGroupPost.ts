import { Group } from "@/models/user/group/Group";
import { OtherUser } from "@/models/user/user/OtherUser";
import { User } from "@/models/user/user/User";
 


export class ChatGroupPost  {
    constructor(public group: Group) {
    }
    getName = () => {
        return this.group.name;
    }
}