import { GroupGet } from "@/models/user/group/GroupGetDTO";
import { AllArgsConstructor } from "@/utils";


@AllArgsConstructor
export class ChatGroupPost  {
    group!: GroupGet;
    
    constructor(group: GroupGet) {
    }
}