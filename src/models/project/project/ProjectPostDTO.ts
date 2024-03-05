import { UserGet } from "@/models/user/user/UserGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class ProjectPost {
    name?: string;
    description?: string;
    deadline?: Date;
    owner!: UserGet;

    constructor(
        name: string | undefined,
        description: string | undefined,
        deadline: Date | undefined,
        owner: UserGet,
    ) { }
}