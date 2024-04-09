import { User } from "@/models/user/user/User";
 

export class ProjectPost {

    constructor(
        public name: string | undefined,
        public description: string | undefined
    ) { }
}