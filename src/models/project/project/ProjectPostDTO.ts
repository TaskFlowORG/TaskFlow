import { UserGet } from "@/models/user/user/UserGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class ProjectPost {
    name?: string;
    description?: string;
    deadline?: Date;
    owner!: UserGet;

    constructor(
        name: string,
        description: string,
        deadline: Date,
        owner: UserGet,
    ) { }
}