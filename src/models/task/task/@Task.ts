// import { AllArgsConstructor } from "@/utils";
// import { Message } from "react-hook-form";
// // import { TaskValueGet } from "@/model/relations/task-value/TaskValue";
// import { LogGet } from "../log/LogGetDTO";
// import { TaskValueGet } from "@/model/relations/task-value/TaskValueGetDTO";

// @AllArgsConstructor
// export class Task {
//     id!: number;
//     name?: string;
//     deleted!: boolean;
//     completed!: boolean;
//     properties!: TaskValueGet[];
//     logs!: LogGet[];
//     comments!: Message[];

//     constructor(id: number, name: string = "", deleted: boolean = false, completed: boolean = false, 
//     properties: TaskValueGet[] = [], logs: LogGet[] = [], comments: Message[] = []) {}

//     equals(obj: any): boolean {
//         if (obj instanceof Task) {
//             return obj.id === this.id;
//         }
//         return false;
//     }
// }
