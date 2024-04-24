import { Group } from "@/models/user/group/Group";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { OtherUser } from "@/models/user/user/OtherUser";
import { User } from "@/models/user/user/User";
 


export class ChatGroupPost  {
    constructor(public group: Group | SimpleGroup) {
    }
    getName = () => {
        return this.group.name;
    }
}