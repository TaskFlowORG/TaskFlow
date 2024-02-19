import { UserGet } from "@/models/user/user/UserGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class ChatPrivatePost {
    users!: UserGet[]; // Adicionado o operador "!"
    
    constructor(users: UserGet[]) {}

}