import { AllArgsConstructor } from "@/utils";
import { Permission } from "./Permission";
import { User } from "./User";
import { Archive } from "./Archive";

@AllArgsConstructor
export class Group {
    id!: number;
    name?: string;
    picture?: Archive;
    description?: string;
    permissions!: Permission[];
    owner!: User;
    users!: User[];

    constructor(id: number, name: string, picture: Archive, description: string, permissions: [], owner: User, users: []) {}

    equals = (obj: any) => {
        return obj instanceof Group && obj.id === this.id;
    }

}