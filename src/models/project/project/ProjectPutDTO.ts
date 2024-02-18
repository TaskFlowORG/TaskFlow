import { UserGet } from "@/model/user/user/UserGetDTO";
import { AllArgsConstructor } from "@/utils";

@AllArgsConstructor
export class ProjectPut {
    id!: number;
    name?: string;
    description?: string;
    deadline?: Date;
    visualizedAt?: Date;

    constructor(
        id: number,
        name: string,
        description: string,
        deadline: Date,
        visualizedAt: Date
    ) { }
    
    equals = (obj: any) => {
        return obj instanceof ProjectPut && obj.id === this.id;
    }
}