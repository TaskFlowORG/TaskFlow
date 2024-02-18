import { AllArgsConstructor } from "@/utils";
import { Message } from "react-hook-form";
import { Chat } from "../chat/Chat";
import { GroupGet } from "@/model/user/group/GroupGetDTO";


@AllArgsConstructor
export class ChatGroupPost  {
    group!: GroupGet;
    
    constructor(group: GroupGet) {
    }
}