import { AllArgsConstructor } from "@/utils";
import { LogGet } from "../log/LogGetDTO";
import { TaskValueGet } from "@/models/relations/task-value/TaskValueGetDTO";
import { MessageGet } from "@/models/chat/message/MessageGetDTO";

@AllArgsConstructor
export class TaskGet {
    id!: number;
    name?: string;
    deleted!: boolean;
    completed!: boolean;
    properties!: TaskValueGet[];
    logs!: LogGet[];
    comments!: MessageGet[];

    constructor(id: number, name: string, deleted: boolean, completed: boolean, properties: TaskValueGet[], 
        logs: LogGet[], comments: MessageGet[]) {}


    equals(obj: any): boolean {
        if (obj instanceof TaskGet) {
            return obj.id === this.id;
        }
        return false;
    }
}
