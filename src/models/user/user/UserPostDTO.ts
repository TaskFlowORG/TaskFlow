import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class UserPost {

    username!: string;
    name!: string;
    surname!: string;
    password!: string;
    mail!: string;

    constructor(username: string, name: string, surname: string, password: string, mail: string) {}
    
    equals = (obj: any) => {
        return obj instanceof UserPost && obj.username === this.username;
    }
}
