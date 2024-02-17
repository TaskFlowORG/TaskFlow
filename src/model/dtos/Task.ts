import { AllArgsConstructor } from "@/utils";
import { Message } from "react-hook-form";
import { Log } from "./Log";
import { TaskValue } from "../relations/TaskValue";

@AllArgsConstructor
export class Task {
    id!: number;
    name?: string;
    deleted!: boolean;
    completed!: boolean;
    properties!: TaskValue[];
    logs!: Log[];
    comments!: Message[];

    constructor(id: number, name: string = "", deleted: boolean = false, completed: boolean = false, properties: TaskValue[] = [], logs: Log[] = [], comments: Message[] = []) {}

    equals(obj: any): boolean {
        if (obj instanceof Task) {
            return obj.id === this.id;
        }
        return false;
    }
}
